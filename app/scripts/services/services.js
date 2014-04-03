var services = angular.module('services', [])
  .factory('apiSrv', ['$http', '$q', function($http, $q) {

  var getUrls = function(){
  
  }
 

  return {
      getUrls: getUrls
    };
}]);