visHome.controller('forgotController',['$scope','$log','adminService',function($scope,$log,adminService){
    $scope.init = function(){
        console.log('forgot controller initialized');

        $scope.user = {
            firstName :"",
            lastName : "",
            email : "",
            password : ""
        };
        $scope.message = "";
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