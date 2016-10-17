angular.module("application").service("applicationServiceNavigation",
function ($rootScope, $state) {
    var list = [
        ["player.quests", "Bridge"],
        ["player.skills", "Skills"]
    ].map(function setNavItem(item) {
        return {
            name: item[0],
            label: item[1],
            sref: 'container.' + item[0]
        };
    });
    this.list = list;

    $rootScope.$on("$stateChangeSuccess", function () {
        list.forEach(function (item) {
            item.active = item.sref === $state.current.name;
        });
    });
});
