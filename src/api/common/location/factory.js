// Todo: Refactor into properties rather than getter/setters.

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

    function model() {
        return data;
    }

    function api() {
        return data;
    }

    function set(location) {
        this.x(location.x());
        this.y(location.y());
        return this;
    }

    this.distance = distance;
    this.model = model;
    this.api = api;
    this.set = set;
}

function instantiate(a, b) {
    var location = new Location();
    if (typeof a === 'object') {
        location.x(a.x);
        location.y(a.y);
    } else {
        location.x(a);
        location.y(b);
    }
    return location;
}

module.exports = instantiate;
