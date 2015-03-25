subsApp.controller('profileController',['$scope','$log','profileService',function($scope,$log,profileService){
    $scope.init = function(){
        console.log('profile controller initialised');
        //$scope.showForgot = false;

        $scope.profile = {};
        $scope.getProfile();
    };


    $scope.getProfile = function(){
        profileService.getProfile().then(function(profile){
            console.log(profile);
            $scope.profile = profile;
        })
    };

}]);