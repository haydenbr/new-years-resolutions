#!/bin/bash

cp -r ../../../../../app/node_modules ./node_modules
cp -r ../../../../../app/platforms ./platforms
cp -r ../../../../../app/plugins ./plugins

echo Profile is $PROFILE $FTP_USERNAME
npm run build-browser
# sh build-scripts/deploy.sh
