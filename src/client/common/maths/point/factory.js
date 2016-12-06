angular.module('commonMaths').factory('commonMathsFactoryPoint', function commonMathsFactoryPoint() {
    function Point(dimensions) {
        function createGetterSetter(dimension) {
            this[dimension] = function getterSetter(value) {
                if (value !== undefined) {
                    dimensions[dimension] = value;
                }
                return dimensions[dimension];
            }
        }

        Object.keys(dimensions).forEach(createGetterSetter.bind(this));

        function equals(point) {
            return Object.keys(dimensions).filter(function (dimension) {
                return dimensions[dimension] !== point[dimension]();
            }.bind(this)).length === 0;
        }

        function set(a, b, c) {
            if (typeof a === "number") {
                // Assume this is a change to the co-ordinates.
                dimensions.x += a || 0;
                dimensions.y += b || 0;
                dimensions.z += c || 0;
            }
            if (typeof a === 'object' && a.constructor === Point) {
                dimensions = angular.extend(dimensions, a);
            }
            return this;
        }

        function add(a, b, c) {
            if (typeof a === "number") {
                // Todo: remove this option.
                // Also, this should take a point object.
                // Assume this is a change to the co-ordinates.
                dimensions.x += a || 0;
                dimensions.y += b || 0;
                dimensions.z += c || 0;
            }
            if (typeof a === 'object' && a.constructor === Point) {
                // Untested.
                Object.keys(a).forEach(function (dimension) {
                    dimensions[dimension] += a[dimension];
                });
            }
        }
        function multiply(scalar) {
            apply(angular.bind(this, function (value, dimension) {
                data[dimension] *= scalar;
            }));
            return this;
        }
        function copy() {
            var point = new Point();
            apply(function (dimension) {
                point[dimension](data[dimension]);
            });
            return point;
        }

        angular.extend(this, {
            equals: equals,
            set: set,
            add: add,
            multiply: multiply,
            copy: copy
        });
    }
    function instantiate(dimensions) {
        if (['object', 'undefined'].indexOf(typeof dimensions) < 0) {
            throw new Error([
                'Expecting Point instantiation argument to be an object if defined.',
                (typeof dimensions),
                'found.'
            ].join(' '));
        }
        dimensions = angular.extend({x: 0, y: 0}, dimensions || {});
        return new Point(dimensions);
    }
    return instantiate;
});
