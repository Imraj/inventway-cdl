var app = angular.module("mhadiab");
app.controller("VBizController",["$scope","BizFactory",function($scope,BizFactory){


    BizFactory.getAllBiz()
          .success(function(data,status){
                $scope.bizs = data;
                console.log("status : " + status);
          })
          .error(function(err,code){
                console.log("err : " + err + " | " + code);
          });

}]);
