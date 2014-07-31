!function () {
    var _ = require("lodash");
    var angular = require("angular");
    require("angular-ui-router");
    require("angular-bootstrap");

    var service = require("./service");

    function AppCtrl(boardGameService, $scope) {
        var app = this;
        app.games = [];

        app.game = {
            count: 0,
            page: 0,
            perPage: 20
        }

        app.user = {
            username: "john.doe",
            password: "foobar"
        }

        app.boardGameService = boardGameService;

        function updatePagination(newPage, oldPage) {
            if (newPage == oldPage) return;
            boardGameService.getGamesByPage(newPage)
                .then(function (result) {
                    app.game.count = result.data.count - app.game.perPage;
                    app.games = result.data.rows;
                })

        }

        app.login = function (username, password) {
            boardGameService.login(username, password)
                .then(function () {
                    updatePagination(0);
                    app.loggingIn = false;
                });
        }

        $scope.$watch("app.game.page", updatePagination);
    }

    angular
        .module("bgs", [
            "ui.router",
            "ui.bootstrap"
        ])
        .constant("BASE_URL", service.BASE_URL)
        .constant("API_URL", service.API_URL)
        .service("boardGameService", service.boardGameService)
        .controller("AppCtrl", AppCtrl)

}();