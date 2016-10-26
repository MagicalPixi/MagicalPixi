/**
 * Created by zyg on 16/10/24.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');

var shortid = require('shortid')

function mimeTypes(ext) {
  var m = {
    '.json':'application/json',
    '.png':'image/png'
  };


  return m[ext];
}

function buildOptions() {

  return {
    host:'localhost',
    port:6770,
    path:'/upload/',
    method:'POST',
  }
}

module.exports = function postFile(fileName,filePath) {

  const ext = path.extname(filePath);

  const mime = mimeTypes(ext);

  const boundaryKey = `WebKitFormBoundary${shortid.generate()}B`;

  const fileSize = fs.statSync(filePath).size;

  const fileData = fs.readFileSync(filePath);

  const reqHttpObj = http.request(buildOptions(),(res)=>{
    
    console.log('statusCode:',res.statusCode);
    console.log('headers',res.headers);

    res.on('data',(body)=>{
      console.log('body:',body.toString());
    });
  });

  const postBody = `--${boundaryKey}
    Content-Disposition: form-data;name="name"
    ${fileName}
    --${boundaryKey}
    Content-Type:${mime}
    Content-Disposition: form-data;name="file"; filename="${fileName}"
    Content-Transfer-Encoding:binary`;

  const postBodyEnd = `\r\n--${boundaryKey}--`;

  const contentLength = Buffer.byteLength(`${postBody}${postBodyEnd}`) + fileSize;

  reqHttpObj.setHeader('Content-Type',`multipart/form-data;boundary=${boundaryKey}`);
  reqHttpObj.setHeader('Content-Length',contentLength);

  console.log(postBody,contentLength);

  reqHttpObj.write(postBody);

  var fileStream = fs.createReadStream(filePath);
  fileStream.pipe(reqHttpObj,{
    end:false
  });
  fileStream.on('end',()=>{

    reqHttpObj.end(postBodyEnd);
  });
 };