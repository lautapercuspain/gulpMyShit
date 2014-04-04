var angular = require('angular');
require('angular-route');
require('./controllers/controllers');
require('./services/services');


var myApp = angular.module('myApp',['controllers','directives', 'ngRoute','services']);

myApp.config(['$routeProvider',
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