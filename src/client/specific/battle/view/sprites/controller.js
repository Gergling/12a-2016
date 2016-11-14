angular.module('battle').controller('battleControllerSprites', function (spriteService) {
    angular.extend(this, {
        visible: spriteService.list
    });
});
