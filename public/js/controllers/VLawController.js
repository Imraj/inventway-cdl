var app = angular.module("mhadiab");
app.controller("VLawController",["$scope","LawFactory",function($scope,LawFactory){


    LawFactory.getAllFirm()
          .success(function(data,status){
                $scope.firms = data;
                console.log("status : " + status);
          })
          .error(function(err,code){
                console.log("err : " + err + " | " + code);
          });

}]);
