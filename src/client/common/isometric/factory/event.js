// Factory to instantiate an event object which can be passed into a grid to be triggered by various events.
angular.module('commonIsometric').factory('commonIsometricFactoryEvent', function () {
    function Event() {
        var data = {
            drag: [],
            select: [],
            hover: []
        };

        function on(event, fnc) {
            data[event].push(fnc);
        }

        function trigger(event, tile, $event) {
            data[event].forEach(function (fnc) {
                fnc(tile, $event);
            });
        }

        angular.extend(this, {
            on: on,
            trigger: trigger
        });
    }
    function instantiate() {
        return new Event();
    }
    return instantiate;
});
