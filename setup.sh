#!/bin/bash

git submodule init
git submodule update

bundle install
npm install

mkdir -p ruby-ll/lib
env/ruby-ll rake
mv ruby-ll/lib/* vendor/ruby-ll/lib
rm -rf ruby-ll

mkdir -p oga/lib
env/oga rake
mv oga/lib/* vendor/oga/lib
rm -rf oga

