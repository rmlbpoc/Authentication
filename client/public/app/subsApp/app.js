'use strict'

var subsApp = angular.module('subsApp', ['commonApp','pageslide-directive','ui.router','ngRoute']);
subsApp.config(['$stateProvider','$routeProvider',function($stateProvider,$routeProvider){
    //$routeProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '../partials/subs/homeDefault.jade'
        })
        .state('home.great', {
          url: 'feeling/great',
          templateUrl: '../partials/subs/feeling/feelingGreat.jade'
        })
        .state('home.full', {
          url: 'feeling/full',
          templateUrl: '../partials/subs/feeling/feelingFull.jade'
        })
        .state('home.tired', {
          url: 'feeling/tired',
          templateUrl: '../partials/subs/feeling/feelingTired.jade'
        })

        // nested list with custom controller
        .state('profile', {
            url: '/profile',
            templateUrl: '../partials/subs/profile/profile.jade'
        })
        .state('profile.pers', {
          url: '/pers',
          templateUrl: '../partials/subs/profile/profileForm.jade'
        })
        .state('profile.assm', {
          url: '/assm',
          templateUrl: '../partials/subs/profile/profileAssm.jade'
        })
        .state('profile.other', {
          url: '/other',
          templateUrl: '../partials/subs/profile/profileOther.jade'
        })


        .state('social', {
            url: '/social',
            templateUrl: '../partials/subs/social/social.jade'
        })
        .state('diary', {
            url: '/diary',
            templateUrl: '../partials/subs/diary/diary.jade'
        })
        .state('reset', {
            url: '/reset/:token',
            templateUrl: '../partials/reset.jade'
        })
}]);
subsApp.run(['$state', function ($state) {
    $state.transitionTo('home');
}]);

