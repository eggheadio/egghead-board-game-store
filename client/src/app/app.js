angular.module('boardGameStore', ['ui.router', 'components', 'boardGameServices', 'hello', 'store', 'detail'])

  .run(function ($state) {
    $state.go('store');
  })
