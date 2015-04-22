'use strict';

var subsApp = angular.module('subsApp', ['commonApp','pageslide-directive','ui.router','ngRoute']);
subsApp.config(['$stateProvider','$routeProvider',function($stateProvider,$routeProvider){
    //$routeProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '../partials/subs/home.jade'
        })

        // Feeling Great route and sub routes
        .state('feelingGreat', {
          url: 'feelingGreat/',
          templateUrl: '../partials/subs/feeling/feelingGreat.jade'
        })
        .state('feelingGreat.food', {
          url: 'food/:date',
          templateUrl: '../partials/subs/diary/foodEntry.jade'
        })
        .state('feelingGreat.activity', {
          url: 'activity/:date',
          templateUrl: '../partials/subs/diary/activityEntry.jade'
        })
        .state('feelingGreat.other', {
          url: 'other/:date',
          templateUrl: '../partials/subs/diary/addMore.jade'
        })

        // Feeling Full route and sub routes
        .state('home.full', {
          url: 'feelingFull/',
          templateUrl: '../partials/subs/feeling/feelingFull.jade'
        })
        .state('home.full.food', {
          url: 'food/:date',
          templateUrl: '../partials/subs/diary/foodEntry.jade'
        })
        .state('home.full.activity', {
          url: 'activity/:date',
          templateUrl: '../partials/subs/diary/activityEntry.jade'
        })
        .state('home.full.other', {
          url: 'other/:date',
          templateUrl: '../partials/subs/diary/addMore.jade'
        })

        // Feeling Tired route and sub routes
        .state('home.tired', {
          url: 'feelingTired/',
          templateUrl: '../partials/subs/feeling/feelingTired.jade'
        })
        .state('home.tired.food', {
          url: 'food/:date',
          templateUrl: '../partials/subs/diary/foodEntry.jade'
        })
        .state('home.tired.activity', {
          url: 'activity/:date',
          templateUrl: '../partials/subs/diary/activityEntry.jade'
        })
        .state('home.tired.other', {
          url: 'other/:date',
          templateUrl: '../partials/subs/diary/addMore.jade'
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

