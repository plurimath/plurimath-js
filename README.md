# Plurimath-JS

A JavaScript converter of mathematical formulas

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

The individual submodules can be tested using scripts in `env` directory.
Those scripts ensure that all the dependencies are satisfied using the
individual submodules and not the released versions. By default, if you
don't provide parameters denoting the command line utility you want to run,
they will issue `opal-rspec`.

## Demo

Demo is available [here](https://www.plurimath.org/plurimath-js/demo.html)
