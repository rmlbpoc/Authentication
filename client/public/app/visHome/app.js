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
        .state('reset', {
            url: '/reset/:token',
            templateUrl: '../partials/reset.jade'
        })
}]);
visHome.run(['$state', function ($state) {
    $state.transitionTo('home');
}]);

visHome.directive('passwordMatch',[function(){
    return {
        restrict : 'A',
        scope : true,
        require : 'ngModel',
        link : function(scope,elem,attrs,control){
            var checker = function(){
                //get the value of the confirm password field
                var pwdConf = scope.$eval(attrs.ngModel);
                //get the value of the passowrd field
                var pwd = scope.$eval(attrs.passwordMatch);

                return pwdConf==pwd;
            };

            scope.$watch(checker,function(n){
                //set the form control to valid if both
                //passwords are the same, else invalid
                console.log('inside directive')
                control.$setValidity("unique", n);
            })
        }

    }
}])