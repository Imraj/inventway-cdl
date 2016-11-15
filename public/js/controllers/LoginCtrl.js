var app = angular.module("mhadiab");
app.controller("LoginCtrl",["$scope","auth","$state",function($scope,auth,$state){

  $scope.userData = {};

  $scope.logInUser = function(){
      console.log("login user");
      auth.logIn($scope.userData).error(function(error){
          $scope.error = error;
           console.log(JSON.stringify($scope.error,null,4));
      }).then(function(){
          console.log("user is now logged in");
          $state.go("home");
      });
  }


}]);
