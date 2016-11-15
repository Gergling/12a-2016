angular.module('sprite').service('spriteService', function () {
    var data = {
        list: []
    };

    Object.keys(data).forEach(function (key) {
        this[key] = function getterSetter(value) {
            if (value !== undefined) {
                data[key] = value;
            }
            return data[key];
        }
    }.bind(this));
});
