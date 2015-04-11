subsApp.controller('profileController',['$scope','$log','profileService',function($scope,$log,profileService){
    $scope.init = function(){
        console.log('profile controller initialised');
        //$scope.showForgot = false;
        $scope.user = {};
        $scope.user.profile = {};
        $scope.getProfile();
    };

    $scope.setForm = function (form) {
        $scope.myForm = form;
    };

    $scope.getProfile = function(){
        profileService.getProfile().then(function(profile){
            console.log(profile);
            $scope.user.profile = profile;
        })
    };

    $scope.updateProfile = function(){
        profileService.updateProfile($scope.user).then(function(data){

        })
    }
}]);