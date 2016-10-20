angular.module('authenticate').service('authenticateServiceInterceptor', function ($rootScope, $q/*, authenticateServiceUser*/) {
    this.request = function (config) {
        /*const token = authenticateServiceUser.token();
        if (token) {
            angular.extend(config.headers, {Authorization: token});
        }*/

        return config;
    };
    this.responseError = function (rejection) {
        if (rejection.status === 401) {
            $rootScope.$broadcast('authenticate:unauthorized');
        }

        return $q.reject(rejection);
    };
});
