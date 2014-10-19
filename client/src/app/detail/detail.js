angular.module("detail", [])

  .config(function ($stateProvider, BASE_URL) {

    $stateProvider.state('detail', {
      url: '/detail/:id',
      templateUrl: 'detail/detail.html',
      controller: 'DetailCtrl as detail',
      resolve: {
        game: function ($http, $stateParams) {
          return $http.get(BASE_URL + "/game/" + $stateParams.id).then(function (res) {
            return res.data;
          })
        }
      }
    })

  })


  .controller("DetailCtrl", function (game, BASE_URL) {
    var detail = this;

    detail.game = game;
    detail.BASE_URL = BASE_URL;
  })
