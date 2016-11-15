var app = angular.module("mhadiab");
app.controller("ViewCtrl",["$scope","QuizFactory","$state","$stateParams","$window","$state",function($scope,QuizFactory,$state,$stateParams,$window,$state){
  console.log("reloading state.....");
  $state.reload();
  console.log("route : " + JSON.stringify($stateParams) );

  QuizFactory.getAllQuiz()
        .success(function(data,status){
            $scope.all_quizzes = data;
            console.log("data : "+data);

        })
        .error(function(err,code){
             console.log("err " + err + " | " + code);
        });

}]);
