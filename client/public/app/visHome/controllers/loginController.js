visHome.controller('loginController',['$scope','$log','adminService',function($scope,$log,adminService){
    $scope.init = function(){
        console.log('login controller initialised');
        $scope.showForgot = false;
        //$scope.showSignup = false;

        $scope.user = {
            firstName :"",
            lastName : "",
            email : "",
            password : ""
        };
        $scope.message = "";
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
    };

    $scope.forgot = function(){
        console.log('calling login with : ', $scope.user);
        adminService.forgot($scope.user).then(function(data){
            //console.log(data);
            $scope.message = data.message;
            if(data.redirect){
                window.location = data.redirect
            }
        })
    }
}]);