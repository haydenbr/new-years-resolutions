#!/bin/bash

npm run docker-pull

VERSION=$(./scripts/get-current-version)

docker run -it -p 8100:8100 -p 35729:35729 -p 53703:53703 \
  -v $(pwd)/src:/app/src unboxedtechnology/new-years-resolutions:$VERSION