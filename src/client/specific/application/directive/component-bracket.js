angular.module("application").directive("componentBracket", function () {
    return {
        transclude: true,
        scope: {horizontal: "@"},
        templateUrl: 'specific/application/partial/component-bracket.html'
    };
});
