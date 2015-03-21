visHome.controller('signupController',['$scope','$log','adminService',function($scope,$log,adminService){
    $scope.init = function(){
        console.log('signup controller initialised');
        //$scope.showForgot = false;
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

}])