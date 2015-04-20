subsApp.controller('navController',['$scope',function($scope){
  console.log('nav controller loaded');
  $scope.checked = false; // This will be binded using the ps-open attribute
  $scope.toggle = function(){
    $scope.checked = !$scope.checked
  }
}]);