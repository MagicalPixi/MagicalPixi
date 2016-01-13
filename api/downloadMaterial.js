/**
 * Created by zyg on 16/1/13.
 */
var path = require('path');

//GET
module.exports = function (req, res) {
  var name = req.query.name;

  console.log(name);

  //res.json({ name })
  res.download(
    path.resolve(__dirname,'../public/materials/admin/deer.png'),
    'deer.png'
  );
};