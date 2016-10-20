angular.module('authenticate', [ ]).config(function ($httpProvider) {
    $httpProvider.interceptors.push('authenticateServiceInterceptor');
});
