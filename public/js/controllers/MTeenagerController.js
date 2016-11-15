var app = angular.module("mhadiab");
app.controller("MTeenagerController",["$scope","TeenagerFactory","$state","$stateParams",function($scope,TeenagerFactory,$state,$stateParams){

     var teenagerId = $stateParams.id;

     TeenagerFactory.getTeenager(teenagerId)
                .success(function(data,status){
                    console.log("status : " + status + " data :" + JSON.stringify(data,null,4));
                    $scope.teenager = data;
                })
                .error(function(err,code){
                     console.log("err : " + err + " | code : " + code);
                });

}]);
