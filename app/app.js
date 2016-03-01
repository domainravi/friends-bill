'use strict';

// Declare, module which depends on views, and components
angular.module('myApp', ['ngRoute', 'firebase', 'myApp.friends'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/friends'});
}]);
