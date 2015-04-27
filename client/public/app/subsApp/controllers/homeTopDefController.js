subsApp.controller('homeTopDefController',['$scope','$log','feelingService','utilityService',function($scope,$log,feelingService,utilityService) {
  $scope.init = function(){
    console.log('***** homeTopDefController ***** initialised');
    $scope.timeOfDay = $scope.$parent.greeting;
    $scope.user = {};
    $scope.feelingEntry = {};
    //console.log($scope.$parent.greeting );
  };

  $scope.$on('gotUser',function(event,data){
    $scope.user = data.user;
    console.log($scope.user);
  });

  $scope.saveFeeling = function(feeling){
    var dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    $scope.feelingEntry = {userId: $scope.user._id, feelingDate:dt,feelingTimeOfDay:$scope.timeOfDay,feelingValue: feeling};

    feelingService.saveFeelingEntry($scope.feelingEntry ).then(function(data){
      console.log(data);
    })
  }
}]);