angular.module('application').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('container', {
            abstract: true,
            templateUrl: "specific/application/partial/container.html",
            controller: "applicationControllerIndex",
            controllerAs: "applicationControllerIndex"
        })
        .state('container.home', {
            url: '/',
            redirectTo: '/login'
        })
        .state('container.login', {
            url: "/login",
            templateUrl: "specific/authenticate/partial/login.html",
            controller: 'authenticate.controller.login'
        })
        .state('container.register', {
            url: "/register",
            templateUrl: "specific/authenticate/partial/register.html"
        })
        .state('container.player-create', {
            url: "/player/create",
            templateUrl: "specific/player/partial/detail.html",
            controller: "player.controller.detail"
        })
        // This will need to redirect to login if nobody is authenticated.
        // The backend will return a 401.
        // An interceptor will handle redirection.
        .state('container.player', {
            abstract: true,
            templateUrl: "specific/player/partial/index.html",
            resolve: {
                player: function () {} // Load up player from service
            }
        })
        .state('container.player.edit', {
            url: "/player/edit",
            templateUrl: "specific/player/partial/detail.html",
            controller: "player.controller.detail"
        })
        .state('container.player.skills', {
            url: "/skills/",
            templateUrl: "specific/skill/partial/skills.html",
            controller: "skillControllerTree"
        })
        .state('container.player.skill-tree', {
            url: "/skills/*skill/",
            templateUrl: "specific/skill/partial/skills.html",
            controller: "skillControllerTree"
        })
        .state('container.player.quests', {
            url: "/bridge",
            templateUrl: "specific/quest/partial/quests.html",
            controller: 'questControllerIndex'
        })
        .state('container.battle', {
            url: "/battle",
            templateUrl: "specific/battle/partial/index.html",
            controller: 'battle.controller.index'
        })
        .state('container.404', {
            url: "/*path",
            templateUrl: "specific/application/partial/404.html"
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
