angular.module('sprite').factory('spriteFactory', function spriteFactory(
    $q,
    commonIsometricServiceTiles,
    commonImageFactoryLoader
) {
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
                    })
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
            graphic: graphic
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
