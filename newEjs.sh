#!/usr/bin/env bash
name=$1
d=$2

if [ $d ]
then

echo "del"

rm "./views/$name.ejs"

rm "public/back/scripts/router$name/index.js"
rm -r "public/back/scripts/router$name"


rm "public/back/scripts/$name.jsx"

else

touch "./views/$name.ejs"

mkdir "public/back/scripts/router$name"
touch "public/back/scripts/router$name/index.js"


touch "public/back/scripts/$name.jsx"

fi