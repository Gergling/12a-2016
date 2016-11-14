angular.module('sprite').service('spriteService', function () {
    var data = {
        list: []
    };

    function list(value) {
        if (value !== undefined) {
            data.list = value;
        }
        return data.list;
    }

    return {
        list: list
    };
});
