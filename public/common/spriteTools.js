/**
 * Created by zyg on 15/11/7.
 */
var makeIdentity = function(a) {
    if(a[0] == 0 && a[1] == 0) {
        return [0, 0]
    }
    var b = Math.pow((Math.pow(a[0], 2) + Math.pow(a[1], 2)), 0.5);
    return [a[0] / b , a[1] / b]
};

var distance = function(x1, y1, x2, y2) {
    return Math.pow((Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), 0.5);
}

var extend = function(){
    arguments = [].slice.call(arguments);
    var l = arguments.length;
    if(arguments.length>1){
        var from = arguments[l-1],
          target = arguments[l-2];

        for(var k in from){
            target[k] = from[k];
        }
        arguments.pop();

        return extend.apply(null,arguments);
    }else{
        return arguments[0];
    }
};

module.exports = {
    makeIdentity:makeIdentity,
    distance: distance,
    extend:extend
};