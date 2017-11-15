#!/bin/bash

NEW_VERSION=$(./scripts/get-current-version)

docker pull unboxedtechnology/new-years-resolutions:$PREVIOUS_VERSION

docker image tag \
  unboxedtechnology/new-years-resolutions:$PREVIOUS_VERSION \
  unboxedtechnology/new-years-resolutions:$NEW_VERSION

docker push unboxedtechnology/new-years-resolutions:$NEW_VERSION
