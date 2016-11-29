angular.module('ability').factory('abilityFactory', function abilityFactory() {
    function Ability() {
        var data = {
            scale: '',
            map: '',
            name: '',
            description: ''
        };

        // Have a function which takes a tile location as an argument to cast.
        Object.keys(data).forEach(function (key) {
            this[key] = function getterSetter(value) {
                if (value !== undefined) {
                    data[key] = value;
                }
                return data[key];
            }
        }.bind(this));
    }
    function instantiate() {
        return new Ability();
    }
    return instantiate;
});
