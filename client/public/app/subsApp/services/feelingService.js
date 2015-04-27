'use strict';

subsApp.factory('feelingService', function($http,$log,$rootScope){
  var feelingService = {
    saveFeelingEntry : function(feelingEntry){
      console.log('######  feeling Entry :',feelingEntry );
      return $http({
          method:'POST',
          url:'/feeling',
          data:feelingEntry
        })
          .then(function(response){
            return response.data;
          })
          .catch(function(error){
            console.log('****  Error:',error);
          });
    }
  };

  return feelingService;
});