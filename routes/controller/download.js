/**
 * Created by zyg on 16/1/13.
 */
var path = require('path');

module.exports = {

  materials:function(req,res){

    //res.json({ name })
    res.download(
      path.resolve(__dirname,'../../public/materials/admin/deer.png'),
      'deer.png'
    );
  }
};