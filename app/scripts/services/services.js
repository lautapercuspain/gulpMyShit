var apiSrv = require('./apiSrv');
var services = angular.module('services', [])
  .factory('apiSrv', ['$http', '$q',  apiSrv.srv]);