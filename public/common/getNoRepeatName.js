module.exports = function (nameArr, myName) {

  var repeatCount = 1;
  var resultName = myName;

  while(nameArr.some(name=>name === resultName)){

    resultName = `${myName}(${repeatCount++})`;
  }

  return resultName;
};