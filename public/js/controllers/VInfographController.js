var app = angular.module("mhadiab");
app.controller("VInfographController",["$scope","InfographFactory","$state",function($scope,InfographFactory,$state){

      InfographFactory.getAllDesigners()
                  .success(function(data,status){
                        console.log("status : " + status + " | " + data);
                        $scope.designers = data;

                  })
                  .error(function(err,code){
                      console.log("err : " + err + " | " +code);
                  });

}]);
