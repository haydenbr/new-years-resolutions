#!/bin/bash

NEW_VERSION=$(./scripts/get-current-version)

docker image tag \
  unboxedtechnology/new-years-resolutions:$PREVIOUS_VERSION \
  unboxedtechnology/new-years-resolutions:$NEW_VERSION

docker push unboxedtechnology/new-years-resolutions:$NEW_VERSION
