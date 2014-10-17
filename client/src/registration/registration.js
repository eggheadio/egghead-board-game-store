angular.module("registration", [])

  .config(function ($stateProvider) {

    $stateProvider.state('registration', {
      url: '/registration',
      templateUrl: 'registration/registration.html',
      controller: 'RegistrationCtrl as registration'
    })

  })

  .controller("RegistrationCtrl", function () {
    //TODO: add directives here :)
  })
