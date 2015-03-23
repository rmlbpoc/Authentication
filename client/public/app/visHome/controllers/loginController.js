visHome.controller('loginController',['$scope','$log','adminService',function($scope,$log,adminService){
    $scope.init = function(){
        console.log('login controller initialised');
        //$scope.showForgot = false;
        //$scope.showSignup = false;

        $scope.user = {
            firstName :"",
            lastName : "",
            email : "",
            password : ""
        };
        $scope.message = "";
    };

    $scope.setForm = function (form) {
        $scope.myForm = form;
    };

    $scope.login = function(){
        console.log($scope.myForm.Loginform);
        console.log('calling login with : ', $scope.user);
        adminService.login($scope.user).then(function(data){
            //console.log(data);
            $scope.message = data;
            if(data.redirect){
                window.location = data.redirect
            }
        })
    };

    $scope.validateForm = function(){
        var valid = true;
        if($scope.myForm.Loginform.email.$invalid){
            valid = false;
        }
        return valid;
    };

}]);