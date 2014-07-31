!function () {
    var _ = require("lodash");
    var angular = require("angular");
    require("angular-ui-router");
    require("angular-bootstrap");

    var BASE_URL = "http://localhost:3000";

    function boardGameService($http, BASE_URL) {
        this.getGamesByPage = function (page) {
            return $http.get(BASE_URL + "/game",
                {params: {page: page}}
            )
        }

        this.getGameNames = function (typeahead) {
            return $http.get(BASE_URL + "/game", {params: {typeahead: typeahead}})
                .then(function (result) {
                    return  result.data.rows;
                })
        }
    }

    function AppCtrl(boardGameService, $scope) {
        var app = this;
        app.gameCount = 0;
        app.gamePage = 0;
        app.gamePerPage = 20;
        app.games = [];
        app.boardGameService = boardGameService;

        $scope.$watch("app.gamePage", function (newVal) {
            boardGameService.getGamesByPage(newVal)
                .then(function (result) {
                    app.gameCount = result.data.count - app.gamePerPage;
                    app.games = result.data.rows;
                })
        })
    }

    angular
        .module("bgs", [
            "ui.router",
            "ui.bootstrap"
        ])
        .constant("BASE_URL", BASE_URL)
        .service("boardGameService", boardGameService)
        .controller("AppCtrl", AppCtrl)

}();