'use strict';

exports.srv = function($http, $q) {
  var getUrls = function(){
    return http.get('www.something.com/api')
  }
 
  return {
      getUrls: getUrls
    };
}