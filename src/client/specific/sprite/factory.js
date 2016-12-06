angular.module('sprite').factory('spriteFactory', function spriteFactory(
    $q,
    commonIsometricServiceTiles,
    commonImageFactoryLoader,
    abilityService
) {
    function SpriteAbility() {
        var data = {
            ability: undefined,
            tiles: []
        };

        Object.keys(data).forEach(function (key) {
            this[key] = function getterSetter(value) {
                if (value !== undefined) {
                    data[key] = value;
                }
                return data[key];
            }
        }.bind(this));
    }

    function Sprite() {
        var data = {
            name: '',
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

        data.abilities = [];

        function abilities(abilityData) {
            if (abilityData) {
                data.abilities = abilityData.map(function (data) {
                    var spriteAbility = new SpriteAbility();
                    spriteAbility.ability(data.ability);
                    spriteAbility.tiles(data.tiles);
                    return spriteAbility;
                });
            }
            return data.abilities;
        }

        function url(scale, map) {
            return [
                'img/specific/sprite/img',
                scale,
                map,
                data.name + '.png'
            ].join('/');
        }

        function setGraphic(image) {
            data.graphic = image.src;
        }

        function graphic(scale, map) {
            if (map !== undefined) {
                commonImageFactoryLoader(url(scale, map))
                    .then(setGraphic)
                    .catch(function () {
                        commonImageFactoryLoader(url(scale, 'common'))
                            .then(setGraphic);
                    });
            }
            return data.graphic;
        }

        function style() {
            var obj = {
                left: data.tile.left(),
                top: data.tile.top(),
                width: '100px',
                height: '50px',
            };
            if (graphic()) {
                obj['background-image'] = 'url(' + graphic() + ')';
            }
            return obj;
        }

        angular.extend(this, {
            style: style,
            graphic: graphic,
            abilities: abilities
        });
    }
    function instantiate(name, abilities, location, scale, map) {
        var sprite = new Sprite();
        var tile = commonIsometricServiceTiles.tile(location.x, 0, location.y);
        sprite.name(name);
        sprite.abilities(abilities);
        sprite.tile(tile);
        sprite.graphic(scale, map);
        return sprite;
    }
    return instantiate;
});
