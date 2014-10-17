!function () {
    var _ = require("lodash");
    var angular = require("angular");
    require("angular-ui-router");
    require("angular-bootstrap");

    var bgs = angular.module("bgs", ["ui.router", "ui.bootstrap"]);
    require("./service")(bgs);
    require("./app/list/list")(bgs);
    require("./app/app")(bgs);


    bgs.run(function ($state) {
        $state.go("app");
    });
}();