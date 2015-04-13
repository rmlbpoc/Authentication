subsApp.controller('profileController',['$scope','$log','profileService',function($scope,$log,profileService){
    $scope.init = function(){
        console.log('profile controller initialised');
        //$scope.showForgot = false;
        $scope.user = {};
        $scope.profile = {};
        $scope.getProfile();
        $scope.placeholderVal = 'birthday';
    };

    $scope.genders=['male','female'];
    $scope.setForm = function (form) {
        $scope.myForm = form;
    };


    $scope.getProfile = function(){
        profileService.getProfile().then(function(data){
            $scope.user = data.user;
            $scope.profile = $scope.user.profile;
            console.log($scope.profile);
            if($scope.profile && $scope.profile.dateOfBirth){
              var dt = new Date($scope.profile.dateOfBirth);
              console.log(dt);
              $scope.profile.dateOfBirth = dt;
              $scope.placeholderVal = $scope.profile.dateOfBirth;
            }
            console.log($scope.profile);
        })
    };

    $scope.updateProfile = function(){
        console.log($scope.user);
        console.log($scope.profile);
        profileService.updateProfile($scope.profile).then(function(data){
            console.log(data);
        })
    };
}]);