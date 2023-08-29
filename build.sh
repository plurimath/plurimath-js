#!/bin/sh
bundle exec opal --esm \
                 -sjruby \
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
                 -c -e'#' > plurimath-opal.mjs

npx terser -c -m --module < plurimath-opal.mjs > plurimath-opal.min.mjs
