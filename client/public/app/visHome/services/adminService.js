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
        },
        forgot:function(user){
            console.log('calling login service - ',user);
            return $http({
                method : 'POST',
                url : '/forgot',
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
        validateResetToken:function(token){
            console.log('calling validate token service - ',token);
            return $http({
                method : 'GET',
                url : '/reset/'+token
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
        resetPassword:function(password,token){
            console.log('calling rest service - ',password,token);
            return $http({
                method : 'POST',
                url : '/reset',
                data : {password:password,token:token},
                xhrFields: {withCredentials: true}
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
    };

    return adminService
});