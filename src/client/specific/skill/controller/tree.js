angular.module("skill").controller("skillControllerTree",
function ($rootScope, $scope, $state, skillServiceNavigation) {
    function stateChange() {
        if ([ "container.player.skills", "container.player.skill-tree" ].indexOf($state.current.name) > -1) {
            skillServiceNavigation.path($state.params.skill);
        }
    };

    $scope.navigation = skillServiceNavigation;
    stateChange();
    $rootScope.$on("$stateChangeSuccess", stateChange);
});
