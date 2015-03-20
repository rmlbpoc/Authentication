'use strict'

visHome.factory('adminService',function($http,$log,$rootScope){
    var adminService = {
        signupUser:function(user){
            console.log('calling signup service - ',user);
            return $http({
                method : 'POST',
                url : '/signup',
                data : user
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
        },
        login:function(user){
            console.log('calling login service - ',user);
            return $http({
                method : 'POST',
                url : '/login',
                data : user
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
    };

    return adminService
});