module.exports = function (bgs) {
    bgs.config(function ($stateProvider) {
        $stateProvider.state("app.list", {
            templateUrl: "./list/list.html",
            controller: "ListCtrl as list",
        })
    })

    function ListCtrl($scope, boardGameService) {
        var list = this;
        list.boardGameService = boardGameService;

        list.games = [];

        list.game = {
            count: 0,
            page: 0,
            perPage: 20
        }

        function updatePagination(newPage, oldPage) {
            if (newPage == oldPage) return;
            boardGameService.getGamesByPage(newPage)
                .then(function (result) {
                    list.game.count = result.data.count - list.game.perPage;
                    list.games = result.data.rows;
                })

        }

        $scope.$watch("list.game.page", updatePagination);

        updatePagination(0);
    }

    bgs.controller("ListCtrl", ListCtrl);
};
