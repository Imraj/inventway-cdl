var app = angular.module("mhadiab");
app.controller("VCarController",["$scope","CarFactory",function($scope,CarFactory){

  CarFactory.getAllCars()
            .success(function(data,status){
                $scope.cars = data;
                console.log("status : " + status);
            })
            .error(function(err,code){
                console.log("err : " + err + " | " + code);
            });

}]);
