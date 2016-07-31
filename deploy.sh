#!/usr/bin/env bash
git pull

gulp syncAPI

npm install pixi-lib@x.x.x

npm run build
