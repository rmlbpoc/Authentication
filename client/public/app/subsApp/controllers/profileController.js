subsApp.controller('profileController',['$scope','$log','profileService',function($scope,$log,profileService){
    $scope.init = function(){
        console.log('profile controller initialised');
        //$scope.showForgot = false;
        $scope.user = {};
        $scope.profile = {};
        $scope.getProfile();
        $scope.placeholderVal = 'birthday';
        $scope.showValErrors = false;
        $scope.showTabs = true;
    };

    $scope.genders=['male','female'];
    $scope.feet = ['4','5','6'];
    $scope.inches = ['0','1','2','3','4','5','6','7','8','9','10','11'];

    $scope.setForm = function (form) {
        $scope.myForm = form;
    };


    $scope.getProfile = function(){
        profileService.getProfile().then(function(data){
            $scope.user = data.user;
            if($scope.user.profile){
              $scope.profile = $scope.user.profile;
            }
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
        if($scope.myForm.profileForm.$valid) {
            profileService.updateProfile($scope.profile).then(function (data) {
              console.log(data);
            })
        }else{
            $scope.showValErrors =true;
        }
    };
}]);