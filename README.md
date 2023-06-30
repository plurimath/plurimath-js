# Plurimath-JS

A JavaScript converter of mathematical formulas

## Building

It is recommended to use Docker/Podman to get a compatible environment.
As of now, it is needed to use Ragel 6 to build necessary parsers.

```bash
$ podman build -t plurimath-js .
$ podman run --rm -it -v.:/srv:z plurimath-js

Inside Podman shell:

# cd /srv
# ./setup.sh
# ./build.sh
```

