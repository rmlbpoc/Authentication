'use strict'

var visHome = angular.module('visHome', ['ui.router','ngRoute']);
visHome.config(['$stateProvider','$routeProvider',function($stateProvider,$routeProvider){
    //$routeProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '../partials/login'
        })

        // nested list with custom controller
        .state('login', {
            url: '/login',
            templateUrl: '../partials/login.jade'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: '../partials/signup.jade'
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: '../partials/forgot.jade'
        })
}]);
visHome.run(['$state', function ($state) {
    $state.transitionTo('home');
}]);