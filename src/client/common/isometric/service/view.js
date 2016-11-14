angular.module('commonIsometric').service("commonIsometricServiceView", [

    "isometric.service.point",

    function (pointService) {
        "use strict";

        var size = pointService.create(500, 250),
            camera = pointService.create();

        this.size = function () {return size; };
        this.camera = function () {return camera; };
    }
]);
