#!/bin/bash

echo "Removing map files..."
rm packages/common/dist/lib/contexts/meta/processAuctions.d.ts.map
rm packages/common/dist/lib/contexts/meta/processAuctions.js.map
rm packages/common/dist/lib/contexts/store.js.map
#find ./packages/ -type f -name '*.map' -delete
#find . -name '*.map' -delete -print

echo "Remove node modules..."
rm -rf ./node_modules

echo "Removing yarn lock file..."
rm yarn.lock
