angular.module("application").directive("componentBracket", function () {
    return {
        transclude: true,
        scope: {horizontal: "@"},
        templateUrl: 'component/application/partial/component-bracket.html'
    };
});
