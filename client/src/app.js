!function () {
    var _ = require("lodash");
    var angular = require("angular");
    require("angular-ui-router");
    require("angular-bootstrap");

    var BASE_URL = "http://localhost:3000";
    var API_URL = "http://localhost:3000/api";

    function boardGameService($http, BASE_URL, API_URL) {

        this.login = function () {
            return $http.post(BASE_URL + "/login", {username: "john.doe", password: "foobar"})
                .then(function (result) {
                    $http.defaults.headers.common.Authorization = "Bearer " + result.data.token;
                })
        }

        this.getGamesByPage = function (page) {
            return $http.get(API_URL + "/game",
                {params: {page: page}}
            )
        }

        this.getGameNames = function (typeahead) {
            return $http.get(API_URL + "/game", {params: {typeahead: typeahead}})
                .then(function (result) {
                    return  result.data.rows;
                })
        }
    }

    function AppCtrl(boardGameService, $scope) {
        var app = this;
        app.user = {
            username: "john.doe",
            password: "foobar"
        }

        function updatePagination(result) {
            app.gameCount = result.data.count - app.gamePerPage;
            app.games = result.data.rows;
        }

        boardGameService.login()
            .then(function () {
                boardGameService.getGamesByPage(0)
                    .then(function (result) {
                        updatePagination(result);

                    })
            });

        $scope.$watch("app.gamePage", function (newVal, oldVal) {
            if(newVal == oldVal) return;

            boardGameService.getGamesByPage(newVal)
                .then(function (result) {
                    updatePagination(result);
                })
        })


        app.gameCount = 0;
        app.gamePage = 0;
        app.gamePerPage = 20;
        app.games = [];
        app.boardGameService = boardGameService;


    }

    angular
        .module("bgs", [
            "ui.router",
            "ui.bootstrap"
        ])
        .constant("BASE_URL", BASE_URL)
        .constant("API_URL", API_URL)
        .service("boardGameService", boardGameService)
        .controller("AppCtrl", AppCtrl)

}();