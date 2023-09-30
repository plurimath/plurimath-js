#!/bin/bash

git submodule init
git submodule update

rm -rf vendor/*/tmp/*
rm -rf vendor/ruby-ll/lib/libll.so vendor/oga/lib/liboga.so

bundle install
npm install

env/ruby-ll rake
env/oga rake

rm -rf vendor/*/tmp/*
rm -rf vendor/ruby-ll/lib/libll.so vendor/oga/lib/liboga.so

