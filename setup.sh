#!/bin/bash
set -e

git submodule init
git submodule update

rm -rf vendor/*/tmp/*
rm -rf vendor/ruby-ll/lib/libll.so vendor/oga/lib/liboga.so

bundle install
npm install

# Setup only needs the generated lexer/parser artifacts from the vendored
# parser gems. Running their default tasks also runs their test suites, which
# fails before the generated files exist on a fresh checkout.
RUBYLL_PURERUBY=1 env/ruby-ll rake lexer parser
RUBYLL_PURERUBY=1 env/oga rake lexer parser

rm -rf vendor/*/tmp/*
rm -rf vendor/ruby-ll/lib/libll.so vendor/oga/lib/liboga.so
