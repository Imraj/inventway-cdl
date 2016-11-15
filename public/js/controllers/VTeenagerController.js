var app = angular.module("mhadiab");
app.controller("VTeenagerController",["$scope","TeenagerFactory","$state",function($scope,TeenagerFactory,$state){

      console.log("Loading..... VTeeenagerController");

     TeenagerFactory.getAllTeenagers()
                .success(function(data,status){
                    console.log("status : " + status + " data : " + JSON.stringify(data,null,4));
                    $scope.teenagers = data;
                })
                .error(function(err,code){

                });

}]);
