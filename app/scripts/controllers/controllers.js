var mainCtrl = require('./mainCtrl');
var controllers = angular.module('controllers',  [])
.controller('mainCtrl', [
  '$scope', 'apiSrv', mainCtrl.ctrl]);