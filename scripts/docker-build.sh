#!/bin/bash

VERSION=$(./scripts/get-current-version)

docker build -t unboxedtechnology/new-years-resolutions:$VERSION .
docker push unboxedtechnology/new-years-resolutions:$VERSION