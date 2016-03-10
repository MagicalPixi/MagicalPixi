#!/usr/bin/env bash
git pull

gulp syncAPI

npm run build
