#!/usr/bin/env bash

# This only makes sense to run after the production site
# has been generated. Having this server running allows
# the automated tests to run on the demo/sandbox site
# and for manual testing of the production build of much-select.

python3 -m http.server 1234 --directory ./dist/site/
