var app = angular.module("mhadiab");
app.controller("RegisterCtrl",["$scope","auth","$state","$auth",function($scope,auth,$state,$auth){

      $scope.userData = {
        fullname:'',
        email:'',
        password:'',
        password_c:''
      }

        $scope.initialView = 0;
        $scope.signUpWithEmail = function(){

            $scope.initialView = 1;

        }

        $scope.registerUser = function(){
            console.log("Registering user : " + JSON.stringify($scope.userData,null,4));
            auth.register($scope.userData).error(function(error){
               $scope.error = error;
               console.log(JSON.stringify($scope.error,null,4));
            }).then(function(){

                console.log("user is now registered");
                $state.go("home");
            });

        }

        $scope.authenticate = function(provider){
            $auth.authenticate(provider).then(function(data){

               console.log("data.token : "+ data.data.token + " | " + data["data"].token);

               auth.saveToken(data.data.token);
               $state.go("home");
            }).catch(function (response) {
                console.log("nope : " + JSON.stringify(response,null,4));
            });;

        }



}]);
