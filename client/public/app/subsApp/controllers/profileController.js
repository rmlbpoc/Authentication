subsApp.controller('profileController',['$scope','$log','profileService',function($scope,$log,profileService){
    $scope.init = function(){
        console.log('profile controller initialised');
        //$scope.showForgot = false;
        $scope.user = {};
        $scope.profile = {};
        $scope.getProfile();
        $scope.placeholderVal = 'birthday';
        if($scope.profile.dateOfBirth){
          $scope.placeholderVal = $scope.profile.dateOfBirth;
        }

    };


    $scope.genders=['male','female'];
    $scope.setForm = function (form) {
        $scope.myForm = form;
    };

    $scope.getProfile = function(){
        profileService.getProfile().then(function(user){
            $scope.user = user;
            $scope.profile = user.profile;
            console.log($scope.user);
        })
    };

    $scope.updateProfile = function(){
        console.log($scope.user);
        console.log($scope.profile);
        //profileService.updateProfile($scope.user).then(function(data){
        //
        //})
    };
}]);