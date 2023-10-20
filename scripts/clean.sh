#!/usr/bin/env bash

# Clean up all the files in the build and dist directories.

rm -Rf ./build/*
rm -f dist/*.js
rm -f dist/*.css
rm -f dist/*.ico
rm -f dist/*.html
rm -f dist/*.map
rm -f -R dist/site
rm -f dist/gen/*.js
