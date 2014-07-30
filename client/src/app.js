!function () {
    var BASE_URL = "http://localhost:3000";

    function boardGameService($http, BASE_URL) {
        this.getGames = function () {
            return $http.get(BASE_URL + "/game")
        }
    }

    function AppCtrl(boardGameService) {
        var app = this;
        app.games = [];

        boardGameService.getGames()
            .then(function (result) {
                app.games = result.data.rows;
            })
    }

    require("angular").module("bgs", [])
        .constant("BASE_URL", BASE_URL)
        .service("boardGameService", boardGameService)
        .controller("AppCtrl", AppCtrl)
}();