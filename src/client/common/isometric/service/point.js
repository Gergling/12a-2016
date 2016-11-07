angular.module('commonIsometric').service("isometric.service.point", function () {
    var Point = function () {
        var data = {
            x: 0,
            y: 0,
            z: 0
        };

        function apply(fnc) {
            Object.keys(data).forEach(fnc);
        }

        angular.bind(this, apply(function (dimension) {
            this[dimension] = function (value) {
                if (value !== undefined) {
                    data[dimension] = value;
                }
                return data[dimension];
            };
        }));

        function set(a, b, c) {
            data.x = a;
            data.y = b;
            data.z = c;
        }
        function add(a, b, c) {
            if (typeof a === "number") {
                // Assume this is a change to the co-ordinates.
                data.x += a || 0;
                data.y += b || 0;
                data.z += c || 0;
            }
            if (typeof a === 'object' && a.constructor === Point) {

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
            x: x,
            y: y,
            z: z,
            set: set,
            add: add,
            multiply: multiply,
            copy: copy
        });
    };

    this.create = function (x, y, z) {
        var point = new Point();
        point.x(x);
        point.y(y);
        point.z(z);
        return point;
    };
});
