var path = require('path');
var fs = require('fs');
// 引入 gulp
var gulp = require('gulp'); 
var gutil = require('gulp-util');


var tasksPath = path.resolve(__dirname,'./tasks/');
var taskList = fs.readdirSync(tasksPath).forEach(function(taskName){
        var taskFn = require(path.resolve(tasksPath,taskName));
        taskFn(gulp);
    });

module.exports = gulp;