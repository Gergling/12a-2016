angular.module('commonImage').factory('commonImageFactoryLoader', function commonImageFactoryLoader($q) {
    return function (src) {
        var deferred = $q.defer();

        var image = new Image();
        image.onerror = function() {
            deferred.reject();
        };
        image.onload = function() {
            deferred.resolve(image);
        };
        image.src = src;

        return deferred.promise;
    }
});
