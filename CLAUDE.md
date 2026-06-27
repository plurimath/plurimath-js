# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`@plurimath/plurimath` — a JavaScript library that converts mathematical formulas between formats (AsciiMath, LaTeX, MathML, HTML, UnicodeMath, OMML).

The conversion engine is written in **Ruby** (the upstream Plurimath gem). This repo's job is to compile that Ruby code into JavaScript using **Opal**, package it as an npm module, and expose it through a thin TypeScript wrapper.

## Architecture

```
src/index.ts                 <- thin TypeScript facade (the only hand-written JS source)
src/plurimath-opal.d.ts      <- handcrafted type map for the compiled JS
build.sh                     <- 1) Opal-compile Ruby→JS, 2) Terser-minify, 3) tsc, 4) Babel→CJS
vendor/                      <- git submodules — see "Submodules" below
spec/                        <- Jest smoke tests; run after build
dist/                        <- build output (gitignored)
```

### The pipeline (build.sh)
1. Copy `src/*` into `tmp/`
2. `bundle exec opal --esm` compiles the Ruby `plurimath` gem (plus its deps parslet, oga, ruby-ll, htmlentities, unitsml, monitor, mml, ox) into `tmp/plurimath-opal.js`
3. `npx terser` minifies the Opal bundle
4. `npx tsc -p tmp/tsconfig.json` compiles `src/index.ts` against the bundled `.d.ts`
5. `npx babel` emits CJS variants of both `dist/index.js` and `dist/plurimath-opal.js`

### The JS facade (src/index.ts)
A single class `Plurimath` that:
- imports the Opal-compiled bundle (`./plurimath-opal.js`)
- calls `Opal.require("plurimath")` to register Ruby modules
- forwards `toAsciimath/toLatex/toMathml/toHtml/toOmml/toDisplay/toUnicodemath` calls to Opal-wrapped Ruby methods on `Opal.Plurimath.Math.$parse(...)`

`toMathml(intent?: boolean)` takes an intent flag and threads it through as a Ruby options Hash via `new Map([["intent", intent]])`.

## Submodules (vendor/)

All Ruby runtime deps live as git submodules under `vendor/` and are vendored as gems via the Gemfile (`path: 'vendor/<name>'`). Building requires all of them to be present:

- `plurimath` — the conversion engine itself (the thing being published)
- `opal` — the Ruby→JS compiler
- `parslet`, `oga`, `ruby-ll`, `htmlentities`, `equivalent-xml` — Plurimath's Ruby deps
- `mml`, `unitsml`, `ox`, `monitor` — Ruby gems resolved via rubygems.org (not vendored)

**The submodule commits are pinned.** Updating any submodule is a deliberate change — it can break the Opal build, the tsc step, or the public API surface that `src/index.ts` and `src/plurimath-opal.d.ts` describe.

`ruby-ll` and `oga` need to be built as C extensions (`env/ruby-ll rake`, `env/oga rake`) before the Opal step; the build script clears `libll.so` / `liboga.so` between runs to keep the Opal bundle pure-Ruby.

## Common commands

All commands assume `npm run submodule:init` has been run at least once.

```bash
# Init submodules (once after cloning)
npm run submodule:init

# Full build (Podman/Docker required — uses Ragel 6 for parsers)
npm run build

# Build smoke test — also runs `npm run build` first via test:js
npm run test:js

# Full Ruby test suite (runs inside the Podman image)
npm run test:rb

# Open a shell inside the build container
npm run podman:shell

# Run a specific Ruby spec from inside the container against the vendored plurimath
env/plurimath spec/path/to/file_spec.rb
```

Single Jest spec file: `npx jest spec/to-mathml-intent.spec.js` (after a build).

## Conventions

- **No manual edits to `dist/`.** Everything in `dist/` is build output and gitignored.
- **The TS API surface in `src/index.ts` must mirror what Opal produces.** If a new converter is added in the vendored Plurimath, expose it here and in `src/plurimath-opal.d.ts`.
- **The `.d.ts` in `src/` is handcrafted**, not generated — `build.sh` copies it on top of tsc's output at the end. Keep it in sync with `src/index.ts`.
- **Format strings** passed as the second `Plurimath` constructor arg must be one of `'asciimath' | 'latex' | 'mathml' | 'html' | 'unicode' | 'omml'`.
- **Module variants:** `dist/index.js` (ESM) and `dist/index.cjs` (CJS) are the two publish artifacts. `package.json` exports map both.

## CI

`.github/workflows/nodejs.yml` — runs `npm run test:js` on Node 16/18/20 for `master` pushes and PRs.

`.github/workflows/deploy-gh-pages.yml` — on push to `master`, rebuilds and deploys `dist/` + `demo.html` to the `gh-pages` branch (powers https://www.plurimath.org/plurimath-js/demo.html).