angular.module('commonIsometric').service("commonIsometricServiceView", 
function commonIsometricServiceView(commonMathsFactoryPoint) {
    var size = commonMathsFactoryPoint({x: 500, y: 250}),
        camera = commonMathsFactoryPoint({z: 0});

    this.size = function () {return size; };
    this.camera = function () {return camera; };
});
