#!/bin/sh
bundle exec opal --esm -sjruby \
                 -qerb \
                 -rcorelib/array/pack \
                 -ropal-parser \
                 -ghtmlentities \
                 -goga \
                 -gparslet \
                 -Ivendor/oga/xml/ \
                 -Ivendor/oga/xpath/ \
                 -Ivendor/oga/ext/pureruby/ \
                 -Ivendor/ruby-ll/ext/pureruby/ \
                 -Ivendor/plurimath/lib \
                 -pplurimath \
                 -c -e'#' > dist/plurimath-opal.js

npx terser -c -m --module < dist/plurimath-opal.js > dist/plurimath-opal.min.js
