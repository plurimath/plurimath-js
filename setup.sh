#!/bin/sh
git submodule init
git submodule update

pushd vendor/ruby-ll
  bundle install
  bundle exec rake
popd

pushd vendor/oga
  bundle install
  bundle exec rake
popd

bundle install
npm install

