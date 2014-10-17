angular.module("boardGameServices", [])

  .constant("BASE_URL", "http://localhost:3000")
  .service("boardGameService", function ($http, BASE_URL) {
    this.getGames = function () {
      return $http.get(BASE_URL + "/game")
    }
  })

