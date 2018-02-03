#!/bin/bash

cp -r ../../../../../app/node_modules ./node_modules

echo Profile is $PROFILE $FTP_USERNAME
npm run build:browser
