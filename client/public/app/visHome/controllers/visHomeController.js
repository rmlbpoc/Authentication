'use strict'
visHome.controller('visHomeController',function($scope,$log){
    $scope.init = function(){
        console.log('controller initialised');
        $scope.showForgot = false;
    }
});