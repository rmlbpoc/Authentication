'use strict'

subsApp.factory('profileService',function($http,$log,$rootScope){
    var profileService = {
        getProfile : function () {
            return $http({
                method : 'GET',
                url : '/profile'
            })
                .success(function(data,status,headers,config){
                    console.log(data);
                })
                .error(function(){
                    //
                })
                .then(function(response){
                    return response.data;
                })
        }
    }

    return profileService
})