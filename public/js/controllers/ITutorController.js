var app = angular.module("mhadiab");
app.controller("ITutorController",["$scope","MyServicesFactory","$stateParams","TutorFactory",function($scope,MyServicesFactory,
                                            $stateParams,TutorFactory){

  var userId = $stateParams.userid;
  MyServicesFactory.getITutor(userId)
              .success(function(data,status){
                    console.log("data : " + data + " | " + status );
                    $scope.itutors = data;
              })
              .error(function(err,code){
                  console.log("err : " + err + " | " + code);
              });

  var id = $stateParams.id;
  TutorFactory.getTutor(id)
              .success(function(data,status){
                  console.log(" data : " + JSON.stringify(data,null,4) + " | status : " + status );
                  $scope.tutor = data;

              })
              .error(function(err,code){
                  console.log(" err : " + err + " | code : " + code );
              });
}]);
