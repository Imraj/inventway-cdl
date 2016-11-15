var app = angular.module("mhadiab");
app.controller("ICarController",["$scope","MyServicesFactory","$stateParams",function($scope,MyServicesFactory,$stateParams){

  MyServicesFactory.getICar(userId)
              .success(function(data,status){
                  console.log("data : " + data + " | " + status );
                  $scope.icars = data;
              })
              .error(function(err,code){
                  console.log("err : " + err + " | " + code);
              });

}]);
