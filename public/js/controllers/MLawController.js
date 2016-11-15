var app = angular.module("mhadiab");
app.controller("MLawController",["$scope","$stateParams","LawFactory",function($scope,$stateParams,LawFactory){

      var id = $stateParams.id;
      console.log("In MLawController right now");

      $scope.mbiz= {};
      LawFactory.getFirm(id)
            .success(function(data,status){
                $scope.firm = data;
                console.log("status : " + status);
            })
            .error(function(err,code){
                  console.log("err : " + err + " | " + code);
            });

      $scope.submitFirmComment = function(){
          LawFactory.submitComment(id)
                .success(function(data,status){
                    console.log("data : " + data + " | " + status );
                })
                .error(function(err,code){
                    console.log("err : " + err + " | " + code);
                });
      }

      $scope.updateRatings = function(){
          LawFactory.updateRatings(id)
                .success(function(data,status){
                    console.log("data : " + data + " | " + status );
                })
                .error(function(err,code){
                    console.log("err : " + err + " | " + code);
                });
      }

}]);
