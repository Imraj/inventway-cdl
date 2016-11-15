var app = angular.module("mhadiab");
app.controller("MTutorController",["$scope","TutorFactory","$state","$stateParams",function($scope,TutorFactory,$state,$stateParams){

     var tutorId = $stateParams.id;
    console.log("tutorId : " + tutorId);
     TutorFactory.getTutor(tutorId)
                .success(function(data,status){
                    console.log("status : " + status + " data :" + JSON.stringify(data,null,4));
                    $scope.tutor = data;
                })
                .error(function(err,code){
                     console.log("err : " + err + " | code : " + code);
                });

      $scope.startTutorMessage = function(tutorId){

         TutorFactory.verify_payment_and_access(tutorId)
                     .success(function(data,status){
                        if(data.access=="valid")
                        {
                           $state.go("inbox_details",{tId:tutorId,type:"tutor"});
                        }
                     })
                     .error(function(err,code){
                          console.log("err : " + err +" | code : " + code);
                     });
      }

}]);
