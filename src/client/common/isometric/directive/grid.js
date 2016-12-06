angular.module('commonIsometric').directive('commonIsometricGrid', function () {
    return {
        scope: {
            cellWidth: "@",
            event: '=commonIsometricGrid'
        },
        transclude: true,
        templateUrl: 'common/isometric/partial/directive-grid.html',
        controllerAs: 'commonIsometricControllerGrid',
        controller: [

            "$scope",
            "$element",
            "$window",
            "commonMathsFactoryPoint",
            "commonIsometricServiceTiles",
            "commonIsometricServiceView",
            'commonIsometricFactoryEvent',

            function ($scope, $element, $window, commonMathsFactoryPoint, commonIsometricServiceTiles, view, commonIsometricFactoryEvent) {
                function Drag() {
                    var enabled = false,
                        offset = commonMathsFactoryPoint();

                    this.start = function ($event) {
                        offset.x($event.clientX);
                        offset.y($event.clientY);
                        enabled = true;
                    };
                    this.stop = function () {
                        if (enabled) {
                            //triggerEvent('drag', tile, $event);
                        }
                        enabled = false;
                    };
                    this.update = function ($event) {
                        if (enabled) {
                            view.camera().add($event.clientX - offset.x(), $event.clientY - offset.y());
                            offset.x($event.clientX);
                            offset.y($event.clientY);
                            commonIsometricServiceTiles.update();
                        }
                    };
                }

                function tiles() {
                    return commonIsometricServiceTiles.visible();
                }

                function tileOp($event, fnc, always) {
                    var el = $element.find('.isometric-grid'),
                        x = $event.clientX - el.offset().left + $window.scrollX,
                        y = $event.clientY - el.offset().top + $window.scrollY;

                    tiles().forEach(function (tile) {
                        always(tile);
                        if (tile.boundsCheck(x - tile.left(), y - tile.top())) {
                            fnc(tile);
                        }
                    });
                }
                var drag = new Drag();

                //console.log($scope.event)

                if ($scope.event && $scope.event.constructor !== commonIsometricFactoryEvent().constructor) {
                    throw new Error([
                        'Unexpected event class. Expected',
                        commonIsometricFactoryEvent().constructor.name + '. Found',
                        (typeof $scope.event === 'object' ? $scope.event.constructor.name : $scope.event) + '.',
                    ].join(' '));
                }

                function triggerEvent(event, tile, $event) {
                    if ($scope.event && $scope.event.constructor === commonIsometricFactoryEvent().constructor) {
                        $scope.event.trigger(event, tile, $event);
                    }
                }

                $scope.cellHeight = $scope.cellWidth / 2;
                //tiles.onChange(function () {$scope.tiles = tiles.visible(); });
                $scope.click = function ($event) {
                    tileOp($event, function (tile) {
                        tile.select(true);
                        triggerEvent('select', tile, $event);
                    }, function (tile) {
                        tile.select(false);
                    });
                };
                $scope.mousedown = function ($event) {
                    drag.start($event);
                };
                $scope.mouseup = function () {
                    drag.stop();
                };
                $scope.mousemove = function ($event) {
                    drag.update($event);
                    tileOp($event, function (tile) {
                        tile.hover(true);
                        triggerEvent('hover', tile, $event);
                    }, function (tile) {
                        tile.hover(false);
                    });
                };

                angular.extend(this, {
                    tiles: tiles
                });
            }
        ]
    };
});
