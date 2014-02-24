var controllers = angular.module('controllers',  [])
.controller('mainCtrl', [
  '$scope', 
  function($scope) {
    
    $scope.features = [
      "Bootstrap Sass",
      "Gulp",
      "Jade",
      "AngularJS",
      "Browserify"
    ];

    
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      //After render 
    });
}]);