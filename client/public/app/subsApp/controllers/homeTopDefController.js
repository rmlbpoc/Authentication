subsApp.controller('homeTopDefController',['$scope','$log','feelingService','utilityService',function($scope,$log,feelingService,utilityService) {
  $scope.init = function(){
    console.log('***** homeTopDefController ***** initialised');
    $scope.timeOfDay = $scope.$parent.greeting;
    $scope.user = {};
    $scope.feelingEntry = $scope.$parent.feelingEntry;
    //console.log($scope.$parent.greeting );
    if($scope.$parent.user){
      $scope.user=$scope.$parent.user;
      console.log($scope.user);
    }
  };

  $scope.$on('gotUser',function(event,data){
    $scope.user = data.user;
  });



  $scope.saveFeeling = function(feeling){
    var dt = utilityService.dateOnly(new Date);
    $scope.feelingEntry = {userId: $scope.user._id, feelingDate:dt,feelingTimeOfDay:$scope.timeOfDay,feelingValue: feeling};

    feelingService.saveFeelingEntry($scope.feelingEntry ).then(function(data){
      $scope.$emit('feelingUpdated',{
        fe:data
      });
      //console.log(data);
    })
  }
}]);