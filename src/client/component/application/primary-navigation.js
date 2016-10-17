angular.module("application").service("applicationServiceNavigation",
function ($rootScope, $state) {
    var list = [
        ["player.quests", "Bridge"]
        ["player.skills", "Skills"]
    ].map(function setNavItem(name, label, sref) {
        return {
            name: name,
            label: label,
            sref: sref || 'container.' + name
        };
    });
    this.list = list;

    $rootScope.$on("$stateChangeSuccess", function () {
        list.forEach(function (item) {
            item.active = item.sref === $state.current.name;
        });
    });
});
