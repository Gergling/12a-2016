angular.module("authenticate").service("authenticateServiceCore", function ($q, $state, $http) {
    var scope = this,
        //request = Restangular.one('user'),
        authenticated = false;

    var user;
    var deferred = $q.defer();

    this.userRoute = function () {return request; };

    // Needs to load up user information once when service is called or user relogs.
    this.update = function () {
        console.error("Deprecated 'update' function");
        return this.user();
    };
    this.user = function () {
        $http.get('/user').then(function (response) {
            authenticated = Object.keys(response).length > 0;
            user = response;
            deferred.resolve(user);
        }).catch(function (response) {
            if (response.status === 401) {
                $state.go('container.login');
            } else {
                console.log('error', response);
            }
        });

        return deferred.promise;
    };

    this.authenticated = function () {return authenticated; };
});
