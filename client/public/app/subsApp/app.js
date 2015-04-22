'use strict';

var subsApp = angular.module('subsApp', ['commonApp','pageslide-directive','ui.router','ngRoute']);
subsApp.config(['$stateProvider','$routeProvider',function($stateProvider,$routeProvider){
    //$routeProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '../partials/subs/homeDefault.jade'
        })
      // Once user has done entering data for the current time, send them to a different view
        .state('home.done', {
          url: '/done',
          templateUrl: '../partials/subs/homeDone.jade'
        })

        // Feeling Great route and sub routes
        .state('home.great', {
          url: 'feelingGreat/',
          templateUrl: '../partials/subs/feeling/feelingGreat.jade'
        })
        .state('home.great.food', {
          url: 'food/:date',
          templateUrl: '../partials/subs/diary/foodEntry.jade'
        })
        .state('home.great.activity', {
          url: 'activity/:date',
          templateUrl: '../partials/subs/diary/activityEntry.jade'
        })
        .state('home.great.other', {
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

