angular.module('components', [])

  .directive('rating', function () {
    var full = "glyphicon-star";
    var empty = "glyphicon-star-empty";

    return {
      templateUrl: 'components/templates/rating.html',
      scope: {
        numStars: "="
      },
      link: function (scope) {
        scope.stars = [];

        for (var i = 0; i < scope.numStars; i++) {
          scope.stars.push(empty);
        }

        scope.getClass = function (index) {
          return scope.stars[index];
        }

        scope.setRating = function (index) {
          for (var i = 0; i < scope.stars.length; i++) {
            scope.stars[i] = i <= index ? full : empty;
          }
        }
      }

    }
  })
