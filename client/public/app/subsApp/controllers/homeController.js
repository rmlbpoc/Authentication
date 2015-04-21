subsApp.controller('homeController',['$scope','$log','profileService','utilityService',function($scope,$log,profileService,utilityService) {

  var greeting = utilityService.getGreeting();

  $scope.init = function () {
    console.log('home controller initialised');
    $scope.user = {};
    $scope.profile = {};
    $scope.getProfile();
    $scope.greeting = '';
    $scope.showValErrors = false;
    $scope.showTabs = true;
    $scope.greeting = '';
    $scope.images = utilityService.images;
    console.log($scope.images);
    $scope.bgImage = '';
    $scope.bgImage = $scope.getRandomImage($scope.images,greeting);
  };

  $scope.getProfile = function(){
    profileService.getProfile().then(function(data){
      $scope.user = data.user;
      $scope.profile = $scope.user.profile;
      $scope.greeting = greeting ;
      console.log($scope.greeting);
      console.log($scope.profile);
      if($scope.profile && $scope.profile.dateOfBirth){
        var dt = new Date($scope.profile.dateOfBirth);
        console.log(dt);
        $scope.profile.dateOfBirth = dt;
        $scope.placeholderVal = $scope.profile.dateOfBirth;
      }
      console.log($scope.user);
    })
  };

  $scope.getRandomImage = function(images,greeting){
    var rand = Math.floor(Math.random()*(6));
    console.log(greeting);
    console.log(rand);
    switch(greeting){
      case 'morning' :
        return images.morning[rand];
      case 'evening' :
        return images.evening[rand];
      case 'afternoon' :
        return images.afternoon[rand];
    }

  }
}]);
