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
            map: 'interstellar',
            name: 'move',
            description: 'Client-side mock of move ability.'
        });
        data.list.push(ability);
        deferred.resolve();
        return deferred.promise;
    }

    fetch();
    list();
    list('spaceship');
    list('spaceship', 'interstellar');
    list('spaceship', 'interstellar', 'move');

    function list(scale, map, name) {
        var abilities = data.list.filter(function (ability) {
            return ability.scale() === scale
                && ability.map() === map
                && ability.name() === name;
        });
        if (name !== undefined) {abilities = abilities[0];}
        return abilities;
    }

    return {
        list: list
    }
});
