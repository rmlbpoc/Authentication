'use strict'

var subsApp = angular.module('subsApp', ['ui.router','ngRoute']);
subsApp.config(['$stateProvider','$routeProvider',function($stateProvider,$routeProvider){
    //$routeProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '../partials/subs/home.jade'
        })

        // nested list with custom controller
        .state('profile', {
            url: '/profile',
            templateUrl: '../partials/subs/profile.jade'
        })

        .state('profile.pers', {
          url: '/pers',
          templateUrl: '../partials/subs/profileForm.jade'
        })
        .state('profile.assm', {
          url: '/assm',
          templateUrl: '../partials/subs/profileAssm.jade'
        })
        .state('profile.other', {
          url: '/other',
          templateUrl: '../partials/subs/profileOther.jade'
        })


        .state('signup', {
            url: '/signup',
            templateUrl: '../partials/signup.jade'
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: '../partials/forgot.jade'
        })
        .state('reset', {
            url: '/reset/:token',
            templateUrl: '../partials/reset.jade'
        })
}]);
subsApp.run(['$state', function ($state) {
    $state.transitionTo('home');
}]);

