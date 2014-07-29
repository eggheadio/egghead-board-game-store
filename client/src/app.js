var angular = require("angular");
angular.module("bgs", [])
    .constant("BASE_URL", "http://localhost:3000")
    .service("boardGameService", function ($http, BASE_URL) {
        this.getGames = function () {
            return $http.get(BASE_URL + "/game")
        }
    })

    .controller("AppCtrl", function (boardGameService) {
        var app = this;
        app.games = [];
        boardGameService.getGames()
            .then(function (result) {
                app.games = result.data;
            })
    })
