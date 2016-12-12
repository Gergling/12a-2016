angular.module('battle').controller('battleControllerPanel', function (battleServiceView) {
    this.sprite = battleServiceView.sprite;

    this.activate = battleServiceView.activate;
});
