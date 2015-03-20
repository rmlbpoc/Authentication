'use strict'
visHome.controller('visHomeController',function($scope,$log,adminService){
    $scope.init = function(){
        console.log('controller initialised');
        $scope.showForgot = false;
        $scope.showSignup = false;

        $scope.user = {
            firstName :"",
            lastName : "",
            email : "",
            password : ""
        };
        $scope.message = "";
    };

    $scope.signupUser = function(){
        console.log($scope.user);
        adminService.signupUser($scope.user).then(function(data){
            //console.log(data);
            $scope.message = data;
            if(data.redirect){
                window.location = data.redirect
            }
        })
    };

    $scope.login = function(){
        console.log('calling login with : ', $scope.user);
        adminService.login($scope.user).then(function(data){
            //console.log(data);
            $scope.message = data;
            if(data.redirect){
                window.location = data.redirect
            }
        })
    }

    $scope.forgot = function(){
        console.log('calling login with : ', $scope.user);
        adminService.forgot($scope.user).then(function(data){
            //console.log(data);
            $scope.message = data;
            if(data.redirect){
                window.location = data.redirect
            }
        })
    }
});