function Range() {
    var data = {
        minimum: 0,
        maximum: 0,
        special: function special() {}
    };

    Object.keys(data).forEach(function () {
        this[key] = function getterSetter(value) {
            if (value !== undefined) {
                data[key] = value;
            }
            return data[key];
        };
    }.bind(this));

    function tileIsEmpty(target) {
        return target.sprite() === undefined;
    }

    function set(value) {
        if (value !== undefined) {
            [
                'minimum',
                'maximum'
            ].forEach(function (prop) {
                if (value[prop] !== undefined) {
                    data[prop] = value;
                }
            });

            if (typeof value.special === 'string') {
                var special = ({
                    'is-empty': tileIsEmpty
                })[value.special];
                if (special === undefined) {
                    throw new Error('Unrecognised special function "' + value.special + '".');
                }
                data.special = special;
            }
        }
    }

    function api() {
        return {
            minimum: data.minimum,
            maximum: data.maximum
        };
    }

    // Public
    this.set = set;
    this.api = api;
}

function instantiate() {
    return new Range();
}

module.exports = instantiate;