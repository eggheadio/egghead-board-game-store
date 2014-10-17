angular.module('boardGameStore', ['ui.router', 'boardGameServices', 'hello', 'store', 'detail', 'registration'])

  .run(function ($state) {
    $state.go('store');
  })
