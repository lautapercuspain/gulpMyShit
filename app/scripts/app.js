var angular = require('angular');
require('angular-route');
require('angular-local-storage');

var myApp = angular.module('myApp',['ngRoute']);

calcApp.config(['$routeProvider',
    function($routeProvider) {
         $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html' 
                })
                .otherwise({
                    redirectTo: '/'
                });    
    }
]);