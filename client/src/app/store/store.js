angular.module("store", [])

  .config(function ($stateProvider) {

    $stateProvider.state('store', {
      url: '/store',
      templateUrl: 'store/store.html',
      controller: 'StoreCtrl as store',
      resolve: {
        games: function ($http, boardGameService) {
          return boardGameService.getGames()
            .then(function (res) {
              return res.data;
            })
        }
      }
    })


  })

  .controller("StoreCtrl", function (games, BASE_URL) {
    var store = this;
    store.selected = "name";
    store.BASE_URL = BASE_URL;

    store.select = function (selected) {
      //flip direction if already selected
      if(store.selected === selected) {
        store.selected = "-" + store.selected;
      }
      else{
        store.selected = selected;
      }
    }

    store.games = games;
  })


