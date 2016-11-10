// Console log for state change error.
angular.module('application').run(function($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
});
