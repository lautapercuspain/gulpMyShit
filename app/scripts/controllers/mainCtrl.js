var controllers = angular.module('controllers',  [])
.controller('mainCtrl', [
  '$scope', 'apiSrv',
  function($scope, apiSrv) {
    
    $scope.features = [
      "Bootstrap Sass",
      "Gulp",
      "Jade",
      "AngularJS",
      "Browserify"
    ];

}]);