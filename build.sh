#!/bin/sh
rm -rf tmp/
mkdir -p tmp/
cp src/* tmp/

echo "** Compiling Plurimath-Opal from Ruby with Opal"
bundle exec opal --esm -sjruby \
                 -qerb \
                 -rcorelib/array/pack \
                 -ropal-parser \
                 -gunitsml \
                 -ghtmlentities \
                 -gparslet \
                 -gzeitwerk \
                 -gmonitor \
                 -sox \
                 -sox/ox \
                 -sox.so \
                 -Ivendor/oga/lib/ \
                 -Ivendor/oga/xml/ \
                 -Ivendor/oga/xpath/ \
                 -Ivendor/oga/ext/pureruby/ \
                 -Ivendor/ruby-ll/lib/ \
                 -Ivendor/ruby-ll/ext/pureruby/ \
                 -Ivendor/plurimath/lib \
                 -pplurimath \
                 -c -e'#' > tmp/plurimath-opal.js

echo "** Minifying Plurimath-Opal with Terser"
npx terser tmp/plurimath-opal.js -o tmp/plurimath-opal.min.js --source-map "content=inline,url='plurimath-opal.js.map'" -c -m --module

echo "** Compiling Plurimath-JS with TSC"
mv tmp/plurimath-opal.min.js tmp/plurimath-opal.js
mv tmp/plurimath-opal.min.js.map tmp/plurimath-opal.js.map
cp tsconfig.json tmp/
npx tsc -p tmp/tsconfig.json
cp tmp/plurimath-opal.js tmp/plurimath-opal.js.map dist/
# Replace a generated type map with a handcrafted one
cp src/plurimath-opal.d.ts dist/

echo "** Generating compatible CJS versions of the library"
npx babel dist/index.js -o dist/index.cjs
sed -i 's/plurimath-opal.js/plurimath-opal.cjs/g' dist/index.cjs
npx babel dist/plurimath-opal.js -o dist/plurimath-opal.cjs
