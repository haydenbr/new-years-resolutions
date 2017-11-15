#!/bin/bash
npm version $@ --no-git-tag-version
npm run sync-config

VERSION=$(./scripts/get-current-version)

git add .
git commit -m "$VERSION"
git tag "$VERSION"