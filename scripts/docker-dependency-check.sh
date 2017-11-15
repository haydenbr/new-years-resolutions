#!/bin/bash
docker pull unboxedtechnology/new-years-resolutions:$PREVIOUS_VERSION
ID=$(docker create unboxedtechnology/new-years-resolutions:$PREVIOUS_VERSION)
docker cp $ID:/app/package.json ./temp-package.json
docker rm -v $ID

VALUE=$(<./temp-package.json)
echo "$VALUE"

rm ./temp-package.json
