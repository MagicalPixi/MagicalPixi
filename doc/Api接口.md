增加一个api

touch ./api/newApi.js

对应 

> GET /api/newApi
> POST /api/newApi


在 newApi.js中,
```
module.exports = [ next1,next2,next3]
```
当只有一个处理:
```
module.exports = function(){

}
```