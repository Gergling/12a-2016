angular.module('ability').service('abilityService',
function abilityService($q, abilityFactory) {
    var data = {
        list: []
    };

    function fetch() {
        // Fetch all the abilities.
        var deferred = $q.defer();
        var ability = abilityFactory({
            scale: 'spaceship',
            map: 'interplanetary',
            name: 'move',
            label: 'Move',
            description: 'Client-side mock of move ability.'
        });
        data.list.push(ability);
        deferred.resolve();
        return deferred.promise;
    }

    function list(scale, map, name) {
        var args = arguments;
        var abilities = data.list.filter(function (ability) {
            return [
                'scale',
                'map',
                'name'
            ].filter(function (value, key) {
                return ability[value]() !== args[key] && args[key] !== undefined;
            }).length === 0;
        });
        if (name !== undefined) {abilities = abilities[0];}
        return abilities;
    }

    fetch();

    return {
        list: list
    }
});
