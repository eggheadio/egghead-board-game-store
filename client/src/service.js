module.exports = function(){
    var BASE_URL = "http://localhost:3000";
    var API_URL = "http://localhost:3000/api";

    function boardGameService($http, BASE_URL, API_URL) {

        this.login = function (username, password) {
            return $http.post(BASE_URL + "/login", {username: username, password: password})
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

    return {
        BASE_URL: BASE_URL,
        API_URL: API_URL,
        boardGameService: boardGameService
    };
}();
