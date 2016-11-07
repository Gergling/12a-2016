angular.module('commonMaths').factory('commonMathsFactoryPoint', function () {
    function Point(dimensions) {
        function createGetterSetter(dimension) {
            this[dimension] = function getterSetter(value) {
                if (value !== undefined) {
                    data[dimension] = value;
                }
                return data[dimension];
            }
        }

        Object.keys(dimensions).map(createGetterSetter);
    }
    function instantiate(dimensions) {
        dimensions = dimensions || {x: 0, y: 0};
    }
    return instantiate;
});
