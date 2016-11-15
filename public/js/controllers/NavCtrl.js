var app = angular.module("mhadiab");
app.controller("NavCtrl",["$scope","auth","$state","$location",function($scope,auth,$state,$location){

    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.currentUser = auth.currentUser();

    $scope.logOut = function(){
        auth.logOut();
        $location.path("home");
    }

}])
