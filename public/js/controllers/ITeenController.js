var app = angular.module("mhadiab");
app.controller("ITeenController",["$scope","MyServicesFactory","$stateParams",function($scope,MyServicesFactory,$stateParams){

    var userId = $stateParams.id;

    MyServicesFactory.getITeen(userId)
                .success(function(data,status){
                      console.log("data : " + data + " | " + status );
                      $scope.iteenagers = data;
                })
                .error(function(err,code){
                      console.log("err : " + err + " | " + code);
                });

}]);
