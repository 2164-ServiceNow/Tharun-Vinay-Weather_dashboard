'use strict';

// Declaring an app level module which depends on views and core components.
angular.module('weatherApp',[
    'ngRoute',
    'weather'
])
    .config(function($routeProvider){
        // Configuring routes
        $routeProvider
            // For the home page, route will use the main.html template.
           .when('/', {
                templateUrl : 'app/pages/main.html'
            })
    })