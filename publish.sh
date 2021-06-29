#!/usr/bin/env bash

error() {
  echo >&2 "error: $*"
  exit 1
}

for package in $(ls "packages"); do
    pushd "packages/$package"
    yarn
    npm publish
    popd
done
