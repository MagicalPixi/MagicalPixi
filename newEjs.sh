#!/usr/bin/env bash
name=$1
d=$2

if [ $d ]
then

echo "del"

    rm "./views/$name.ejs"

    rm -r "public/js/$name"

    rm -r "public/js/$name/router"
    rm "public/js/$name/router/index.js"

    rm "public/js/$name/$name.jsx"

else

    touch "./views/$name.ejs"

    mkdir "public/js/$name"

    mkdir "public/js/$name/router"
    touch "public/js/$name/router/index.js"

    touch "public/js/$name/$name.jsx"
fi