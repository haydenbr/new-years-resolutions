#!/bin/bash

id=$(docker create unboxedtechnology/new-years-resolutions)
docker cp $id:/app/package.json ./temp-package.json
docker rm -v $id

value=$(<./temp-package.json)
echo "$value"

rm ./temp-package.json