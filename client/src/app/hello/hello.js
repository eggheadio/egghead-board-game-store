angular.module("hello", [])

  .config(function ($stateProvider) {
    $stateProvider.state('hello',
      {
        url: '/hello',
        templateUrl: 'hello/hello.html',
        controller: 'HelloCtrl as hello'
      })
  })

  .controller("HelloCtrl", function ($http) {
    var hello = this;

    hello.title = "Welcome to a simple AngularJS example";
    hello.message = "";
    hello.name = "";

    hello.submit = function (name) {
      $http.post("http://localhost:3000/hello", {name: name})
        .then(function (res) {
          hello.message = res.data.message;
        })
    }

  })
