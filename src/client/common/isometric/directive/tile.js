angular.module('commonIsometric').directive('commonIsometricTile', [
    function () {
        "use strict";

        return {
            scope: {commonIsometricTile: "="},
            templateUrl: 'common/isometric/partial/directive-tile.html',
            link: function ($scope, $element) {
                var img = $element.find('img');
                img.bind('load', function () {
                    $element.find('.overlay')
                        .height(img.height())
                        .css({top: 'initial'});
                });
            },
            controller: [

                "$scope",
                "isometric.service.tile",

                function ($scope, tileService) {
                    if (!($scope.commonIsometricTile instanceof tileService.create().constructor)) {throw new Error("isometricTile directive: attribute value must be an isometric tile."); }

                    // Todo: Variable content settings
                    $scope.image = "specific/battle/img/isometric-square-100x50-empty.png";
                }
            ]
        };
    }
]);
