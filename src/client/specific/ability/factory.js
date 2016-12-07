angular.module('ability').factory('abilityFactory', function abilityFactory() {
    function Ability() {
        var data = {
            scale: undefined,
            map: undefined,
            name: undefined,
            label: '',
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
    function instantiate(value) {
        var ability = new Ability();
        Object.keys(value).forEach(function (key) {
            ability[key](value[key]);
        });
        return ability;
    }
    return instantiate;
});
