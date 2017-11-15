#!/bin/bash

npm run docker-pull

VERSION=$(./scripts/get-current-version)

docker run -it -p 8100:8100 -p 35729:35729 -p 53703:53703 \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/webpack:/app/webpack \
  -v $(pwd)/tslint.json:/app/tslint.json \
  -v $(pwd)/tsconfig.json:/app/tsconfig.json \
  unboxedtechnology/new-years-resolutions:$VERSION \