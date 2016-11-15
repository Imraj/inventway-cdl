var app = angular.module("mhadiab");
app.controller("IDesignerController",["$scope","MyServicesFactory","$stateParams",function($scope,MyServicesFactory,$stateParams){

  MyServicesFactory.getIDesigner(userId)
              .success(function(data,status){
                    console.log("data : " + data + " | " + status );
                    $scope.idesigners = data;
              })
              .error(function(err,code){
                  console.log("err : " + err + " | " + code);
              });

}]);
