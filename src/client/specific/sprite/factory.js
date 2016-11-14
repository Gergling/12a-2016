angular.module('sprite').factory('spriteFactory', function (commonIsometricServiceTiles) {
    function Sprite() {
        var data = {
            name: '',
            abilities: [],
            tile: undefined
        };

        Object.keys(data).forEach(function (key) {
            this[key] = function getterSetter(value) {
                if (value !== undefined) {
                    data[key] = value;
                }
                return data[key];
            }
        }.bind(this));

        function style() {
            //top and left are related to the centre of the tile the sprite is endowed with
            return {
                left: data.tile.left(),
                top: data.tile.top()
            };
        }

        angular.extend(this, {
            style: style
        });
    }
    function instantiate(name, abilities, location) {
        var sprite = new Sprite();
        var tile = commonIsometricServiceTiles.tile(location.x, 0, location.y);
        sprite.name(name);
        sprite.abilities(abilities);
        sprite.tile(tile);
        return sprite;
    }
    return instantiate;
});
