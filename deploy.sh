#!/usr/bin/env bash
noNpmUpdate=$1

git pull

gulp syncAPI

if [ ! $noNpmUpdate ]
then
    npm install pixi-lib@x.x.x
fi

npm run build
