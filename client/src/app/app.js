module.exports = function (bgs) {
    bgs.config(function ($stateProvider) {
        $stateProvider.state("app", {
            templateUrl: "./app/app.html",
            controller: "AppCtrl as app",
        })
    });

    function AppCtrl(boardGameService, $state) {
        var app = this;

        app.user = {
            username: "john.doe",
            password: "foobar"
        }

        app.login = function (username, password) {
            boardGameService.login(username, password)
                .then(function () {
                    app.loggingIn = false;
                    $state.go("app.list");
                });
        }
    }

    bgs.controller("AppCtrl", AppCtrl);
};

