#!/bin/bash

export PREVIOUS_VERSION=$(./scripts/get-current-version)

npm version $@ --no-git-tag-version
npm run sync-config
npm run sync-pipeline
npm run copy-dependencies

VERSION=$(./scripts/get-current-version)

git add .
git commit -m "$VERSION"
git tag "$VERSION"

npm run docker-build

unset PREVIOUS_VERSION
