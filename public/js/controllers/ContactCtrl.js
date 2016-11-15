var app = angular.module("mhadiab");
app.controller("ContactCtrl",["$scope","$state","auth",function($scope,$state,auth){

    $scope.contact = {};

    submitContactForm = function(){
        auth.submitContactForm($scope.contact)
                .success(function(data,status){
                   console.log("data : " + data);
                   console.log("status : " + status);
                })
                .error(function(err,code){
                    console.log("Err : " + err + " | " + code);
                });
    }

}]);
