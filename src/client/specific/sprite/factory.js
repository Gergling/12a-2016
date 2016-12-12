angular.module('sprite').factory('spriteFactory', function spriteFactory(
    $q,
    commonIsometricServiceTiles,
    commonImageFactoryLoader,
    abilityService
) {
    function SpriteAbility() {
        // Private variables.
        var data = {
            ability: undefined,
            tiles: []
        };

        // Getter/setters.
        Object.keys(data).forEach(function (key) {
            this[key] = function getterSetter(value) {
                if (value !== undefined) {
                    data[key] = value;
                }
                return data[key];
            }
        }.bind(this));

        // Complex variables.
        data.activate = []; // Stores functions to be fired on sprite ability activation.

        // Specific functions.

        function highlight(state) {
            data.tiles.forEach(function (tile) {
                tile.cssClass()[(state ? 'add' : 'remove')]('highlight');
            });            
        }

        // Activates an ability, putting the map into a highlighted 'mode'.
        function activate() {
            highlight(true);

            // data.activate.forEach(function (fnc) {
            //     fnc(data.tiles);
            // });
        }

        function cast(tile) {
            highlight(false);

            // Post request the ability.
        }

        // needs a cancel here or in map service as an option

        // Activation callbacks.
        function on(event, fnc) {
            data[event].push(fnc);
        }

        angular.extend(this, {
            activate: activate,
            on: on,
            cast: cast
        });
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
                data.abilities = abilityData.map(function (spriteAbilityData) {
                    var spriteAbility = new SpriteAbility();
                    spriteAbility.ability(spriteAbilityData.ability);
                    spriteAbility.tiles(spriteAbilityData.tiles);
                    spriteAbilityData.on.forEach(function (on) {
                        spriteAbility.on(on.event, on.fnc);
                    });
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

        // Simply sets the graphic src when called by the image loader.
        function setGraphic(image) {
            data.graphic = image.src;
        }

        // Loads the graphic based on the scale, map and name.
        // Todo: consider preloader of some kind which the app won't load without.
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
