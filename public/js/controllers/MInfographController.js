var app = angular.module("mhadiab");
app.controller("MInfographController",["$scope","InfographFactory","$stateParams",function($scope,InfographFactory,$stateParams){

      var desId = $stateParams.id;

      InfographFactory.getDesigner(desId)
                      .success(function(data,status){
                          $scope.infograph = data;
                      })
                      .error(function(err,code){
                          console.log("err : " + err + " | " + code);
                      });

}]);
