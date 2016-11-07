angular.module('commonIsometric').service('commonIsometricServiceTiles', [

    "$filter",
    "isometric.service.tile",
    "isometric.service.view",

    function ($filter, tileService, view) {
        "use strict";

        var tiles = {
            all: [ ], // All tiles with facilities
            visible: [ ] // All tiles printed to the html
        };
        var constructionMode = false;
        var updateCallbacks = [ ];

        function update() {
            // Update all visible tiles
            tiles.visible = $filter('filter')(tiles.all, function (tile) {
                var isVisible = true;
                if (
                    tile.left() > view.size().x()
                        || tile.left() + tile.size().x() < 0
                        || tile.top() > view.size().y() + 300
                        || tile.top() + tile.size().y() < 0
                ) {
                    isVisible = false;
                }
                return isVisible;
            });
            //updateCallbacks.forEach(function (fnc) {fnc(); });
        }

        function visible() {
            return $filter('orderBy')(tiles.visible, [
                "+y()",
                function (tile) {return tile.location().x() - tile.location().z(); }
            ]);
        };
        function tile(x, y, z) {
            var all = tiles.all.filter(function (tile) {
                return tile.location().x() === x && tile.location().y() === y && tile.location().z() === z;
            });

            if (!all[0]) {
                all = [tileService.create()];
                all[0].location().set(x, y, z);
                tiles.all.push(all[0]);
                update();
            }

            return all[0];
        }
        // function onChange(cb) {
        //     updateCallbacks.push(cb);
        //     update();
        // };

        function screenLocation(x, y, z) {
            // Put in a tile location
            // Return a screen location for the centre of that tile.
            return tile(x, y, z).centre();
        }

        return {
            update: update,
            visible: visible,
            tile: tile
        };
    }
]);
