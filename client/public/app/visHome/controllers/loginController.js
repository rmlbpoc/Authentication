visHome.controller('loginController',['$scope','$log','adminService',function($scope,$log,adminService){
    $scope.init = function(){
        console.log('login controller initialised');
        //$scope.showForgot = false;
        //$scope.showSignup = false;

        $scope.user = {
            firstName :"",
            lastName : "",
            email : "",
            password : ""
        };
        $scope.message = "";


        $scope.a=[1,2,2,3,4];
        $scope.b=[2,2,3];

        //$scope.inters();
        //$scope.append();
        //
        //doAsync(function(){
        //    var dt = new Date;
        //    console.log('The current time is : ' + dt.getHours() + ':' + dt.getMinutes() + ':' +dt.getSeconds());
        //});
        //
        //doAsync2()
        //    .done(function (data) {
        //        console.log("Executed after a delay = " + data);
        //    }).fail(function (data) {
        //        console.log("Executed if the async work fails = " + data);
        //    });
    };

    $scope.setForm = function (form) {
        $scope.myForm = form;
    };

    $scope.login = function(){
        console.log($scope.myForm.Loginform.$valid);
        console.log('calling login with : ', $scope.user);
        adminService.login($scope.user).then(function(data){
            console.log(data);
            $scope.message = data;
            if(data.redirect){
                window.location = data.redirect
            }
        })
    };

    $scope.validateForm = function(){
        var valid = true;
        if($scope.myForm.Loginform.email.$invalid){
            valid = false;
        }
        return valid;
    };



    /*---------------------------------------------------------------------------------------------*
     *-----------  ALL THE CODE BELOW IS RANDOM PRACTICE CODE -------------------------------------*
     *---------------------------------------------------------------------------------------------*/
    //intersection of 2 arrays
    $scope.inters = function(){
        var res = [];  // final result will be here
        var h1 = {}; // crete hashtable /associative array with the first list
        for(var i=0;i<$scope.a.length;i++){
            //console.log("value of arr : " + $scope.a[i].toString());
            if(h1[$scope.a[i]]){
                //console.log($scope.a[i].toString() + " exists in the hash with value " + h1[$scope.a[i]]);
                h1[$scope.a[i]]=h1[$scope.a[i]]+1;
            }else{
                //console.log($scope.a[i].toString() + " does not exist in the hash");
                h1[$scope.a[i]]=1
            }
        }
        console.log(h1);

        //now iterate thru the next list
        for (j=0;j<$scope.b.length;j++){
            if(h1[$scope.b[j]] && h1[$scope.b[j]]>0){
                res.push($scope.b[j]);
                h1[$scope.b[j]]=h1[$scope.b[j]]-1;
            }
        }
        console.log(res);
    }

    $scope.append = function(){
        var a = [1,2];
        var b = [3,4,5];
        a.push.apply(a,b);
        console.log(a)
    };

    //using callbacks
    var doAsync = function(cb){
        var dt1 = new Date;
        console.log('calling callback at ' + dt1.getHours() + ':' + dt1.getMinutes() + ':' +dt1.getSeconds());
        //cb();
        setTimeout(function(){
            cb();
        },2000)
    };

    //using
    var doAsync2 = function(){
        var deferredObject = $.Deferred();
        setTimeout(function(){
            var randomValue = Math.random();
            if(randomValue < 0.5) {
                deferredObject.resolve(randomValue);
            } else {
                deferredObject.reject(randomValue);
            }
        },2000);

        return deferredObject.promise();
    }

}]);