visHome.controller('signupController',['$scope','$log','adminService',function($scope,$log,adminService){
    $scope.init = function(){
        console.log('signup controller initialised');
        //$scope.showForgot = false;
        $scope.showSignup = false;

        $scope.user = {
            firstName :"",
            lastName : "",
            email : "",
            password : "",
            confPassword : ""
        };
        $scope.message = "";
        $scope.showValErrors = false;
    };

    $scope.setForm = function (form) {
        $scope.myForm = form;
    };

    $scope.signupUser = function(){
        console.log($scope.myForm.Signupform.$valid);
        if($scope.myForm.Signupform.$valid){
            //console.log($scope.user);
            adminService.signupUser($scope.user).then(function(data){
                //console.log(data);
                $scope.message = data;
                if(data.redirect){
                    window.location = data.redirect
                }
            })
        }else{
            $scope.showValErrors =true;
        }

    };

}]);