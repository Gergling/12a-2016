function Location() {
    var data = {
        x: 0,
        y: 0
    };

    Object.keys(data).forEach(function (key) {
        this[key] = function getterSetter(value) {
            if (value !== undefined) {
                data[key] = value;
            }
            return data[key];
        };
    }.bind(this));

    function distance(location) {
        var diff = 0;
        [
            'x',
            'y'
        ].forEach(function (prop) {
            diff += Math.abs(data[prop] - location[prop]());
        });
        return diff;
    }
}

function instantiate(x, y) {
    var location = new Location();
    location.x(x);
    location.y(y);
    return location;
}

module.exports = instantiate;
