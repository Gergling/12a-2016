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
    }.bind(this))
}

function instantiate(x, y) {
    var location = new Location();
    location.x(x);
    location.y(y);
    return location;
}

module.exports = instantiate;
