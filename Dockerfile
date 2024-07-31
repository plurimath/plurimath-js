FROM ubuntu:24.04

RUN apt-get update && apt-get upgrade -y && apt-get install -y ragel ruby gcc g++ ruby-dev npm git wget make ruby-bundler libyaml-dev && apt-get clean

WORKDIR /srv
