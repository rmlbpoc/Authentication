visHome.controller('resetController',['$scope','$stateParams','$log','adminService',function($scope,$stateParams,$log,adminService){
    $scope.init = function(){
        console.log('reset controller initialised with token :' + $stateParams.token);
        //$scope.showForgot = false;
        $scope.successfulUpdate = false;
        $scope.pwd = {
            password : "",
            confPassword : ""
        };
        $scope.TokenCheck = {valid:false,message:""};
        $scope.showValErrors = false;

        //verify that the reset token is still valid
        adminService.validateResetToken($stateParams.token).then(function(data){
            $scope.TokenCheck = data;
            //console.log($scope.TokenCheck);
        })
    };

    $scope.setForm = function (form) {
        $scope.myForm = form;
    };

    $scope.resetPassword = function(){
        console.log($scope.myForm.resetForm.$valid);
        if($scope.myForm.resetForm.$valid){
            console.log($scope.pwd);
            adminService.resetPassword($scope.pwd.password,$stateParams.token).then(function(data){
                console.log(data);
                $scope.successfulUpdate = data;
                if(data.redirect){
                    window.location = data.redirect
                }

            })
        }else{
            $scope.showValErrors =true;
        }

    };

}]);


