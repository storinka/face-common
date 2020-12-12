#!/bin/bash

rm -rf lib &&
npm run build &&
cp package.json lib &&
cd lib &&
npm publish --access public &&
cd - &&
exit
