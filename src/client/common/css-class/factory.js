// Maybe include the possibility of object-based CSS. Because angular.
angular.module('commonCSSClass').factory('commonCSSClassFactory', function () {
    function CSSClass() {
        var data = {};

        function reset() {
            data.conditional = {};
            data.static = [];
        }

        function conditional() {
            var classes = {};
            Object.keys(data.conditional).forEach(function (cls) {
                classes[cls] = data.conditional[cls]();
            });
            return classes;
        }

        function static() {
            return data.static.join(' ');
        }

        function add(cls, condition) {
            if (condition) {
                data.conditional[cls] = condition;
            } else {
                data.static.push(cls);
            }
            return this;
        }
        function remove(value) {
            delete data.conditional[value];
            var idx = data.static.indexOf(value);
            if (idx > -1) {
                data.static.splice(idx, 1);
            }
            return this;
        }

        reset();

        angular.extend(this, {
            conditional: conditional,
            static: static,
            add: add,
            remove: remove,
            reset: reset
        });
    }

    function instantiate(data) {
        var cls = new CSSClass();
        if (data !== undefined) {
            Object.keys(data).forEach(function (key) {
                cls[key](data[key]);
            });
        }
        return cls;
    }

    return instantiate;
});
