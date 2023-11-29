# Plurimath-JS

A JavaScript converter of mathematical formulas

## Demo

Demo is available [here](https://www.plurimath.org/plurimath-js/demo.html)

## Usage

### Web applications

```html
<script type="module">
  import Plurimath from "https://www.plurimath.org/plurimath-js/dist/index.js";

  const formula = new Plurimath('ubrace(1+2+3+4)_("4 terms")', "asciimath");
  console.log(formula.toLatex());
</script>
```

### Node.JS

```bash
$ npm install -S @plurimath/plurimath
```

ES Modules (recommended):

```javascript
import Plurimath from "@plurimath/plurimath"

const formula = new Plurimath('ubrace(1+2+3+4)_("4 terms")', "asciimath");
console.log(formula.toLatex());
```

CommonJS:

```javascript
const Plurimath = require("@plurimath/plurimath/index.cjs").default;

const formula = new Plurimath('ubrace(1+2+3+4)_("4 terms")', "asciimath");
console.log(formula.toLatex());
```

## Building

### The easy method

Please make sure you have podman installed and do `npm run submodule:init` and then `npm run build`.

### The developer method

It is recommended to use Docker/Podman to get a compatible environment.
As of now, it is needed to use Ragel 6 to build necessary parsers.

```bash
$ podman build -t plurimath-js .
$ podman run --rm -it -v.:/srv:z plurimath-js

Inside Podman shell:

# ./setup.sh
# ./build.sh
```

## Testing

### The easy method

```bash
npm run test:js # To run the JS smoke test
npm run test:rb # To run the entire Ruby testsuite
```

### The developer method

The individual submodules can be tested using scripts in `env` directory.
Those scripts ensure that all the dependencies are satisfied using the
individual submodules and not the released versions. By default, if you
don't provide parameters denoting the command line utility you want to run,
they will issue `opal-rspec`.

## Releasing

```bash
npm run build
npm publish
```
