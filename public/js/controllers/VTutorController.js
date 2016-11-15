var app = angular.module("mhadiab");
app.controller("VTutorController",["$scope","TutorFactory","$state",function($scope,TutorFactory,$state){

     TutorFactory.getAllTutors()
                .success(function(data,status){
                    console.log("status : " + status + " data : " + JSON.stringify(data,null,4));
                    $scope.tutors = data;
                })
                .error(function(err,code){

                });

}]);
