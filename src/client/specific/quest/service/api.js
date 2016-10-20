angular.module("quest").service("questServiceAPI",
function ($http) {

    "use strict";

    //var quests = Restangular.all("quests");

    // Todo: Name this 'list'.
    this.fetch = function () {
        //return quests.getList();
        return $http.get('/quests')
    };

    this.startMission = function (questId) {
        // Find out how to do a restangular post.
        return quests.post({questId: questId});
    };
    this.all = function () {return quests; };
});
