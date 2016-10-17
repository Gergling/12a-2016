angular.module('application').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('container', {
            abstract: true,
            templateUrl: "component/application/partial/container.html",
            controller: "applicationControllerIndex",
            controllerAs: "applicationControllerIndex"
        })
        .state('container.login', {
            url: "/login",
            templateUrl: "component/authenticate/partial/login.html"
        })
        .state('container.register', {
            url: "/register",
            templateUrl: "component/authenticate/partial/register.html"
        })
        .state('container.player-create', {
            url: "/player/create",
            templateUrl: "component/player/partial/detail.html",
            controller: "player.controller.detail"
        })
        // This will need to redirect to login if nobody is authenticated.
        // The backend will return a 401.
        // An interceptor will handle redirection.
        .state('container.player', {
            abstract: true,
            templateUrl: "component/player/partial/index.html",
            resolve: {
                player: function () {} // Load up player from service
            }
        })
        .state('container.player.edit', {
            url: "/player/edit",
            templateUrl: "component/player/partial/detail.html",
            controller: "player.controller.detail"
        })
        .state('container.player.skills', {
            url: "/skills/",
            templateUrl: "component/skill/partial/skills.html",
            controller: "skill.controller.tree"
        })
        .state('container.player.skill-tree', {
            url: "/skills/*skill/",
            templateUrl: "component/skill/partial/skills.html",
            controller: "skill.controller.tree"
        })
        .state('container.player.quests', {
            url: "/bridge",
            templateUrl: "component/quest/partial/quests.html"
        })
        .state('container.battle', {
            url: "/battle",
            templateUrl: "component/authenticate/partial/battle.html"
        })
        .state('container.404', {
            url: "/*path",
            templateUrl: "component/application/partial/404.html"
        });

    // New routes:
        // Container abstract
            // Skills
            // Guest abstract
                // Login
                // Register
            // Auth
                // Quests
                // Battle

    $urlRouterProvider.otherwise('/bridge');
});
