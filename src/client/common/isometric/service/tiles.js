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

        (function () {
            // TODO: Generate some empty tiles.
            var x = 0, z = 0, tile;
            for (z = 0; z < 3; z += 1) {
                for (x = 0; x < 3; x += 1) {
                    tile = tileService.create();
                    tile.point().set(x, 0, z);
                    tiles.all.push(tile);
                }
            }
        }());

        update();

        function visible() {
            return $filter('orderBy')(tiles.visible, [
                "+y()",
                function (tile) {return tile.point().x() - tile.point().z(); }
            ]);
        };
        function tile(x, y, z) {
            var all = tiles.all.filter(function (tile) {
                return tile.point().x() === x && tile.point().y() === y && tile.point().z() === z;
            });

            if (!all[0]) {
                all = [tileService.create()];
                all[0].point().set(x, y, z);
                tiles.all.push(all[0]);
                update();
            }

            return all[0];
        }
        // function onChange(cb) {
        //     updateCallbacks.push(cb);
        //     update();
        // };

        return {
            update: update,
            visible: visible,
            tile: tile
        };
    }
]);
