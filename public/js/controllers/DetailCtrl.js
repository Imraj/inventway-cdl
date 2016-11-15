var app = angular.module("mhadiab");
app.controller("DetailCtrl",["$scope","QuizFactory","$stateParams","$window","$state","PaymentFactory",function($scope,QuizFactory,$stateParams,$window, $state,PaymentFactory){

    var id = $stateParams.id;
    $scope.showCCForm = false;
    $scope.quiz_card = {
      amount:"100",
      type:"master",
      firstname:"",
      lastname:"",
      card_type:"",
      card_number:"",
      card_month:"",
      card_year:"",
      card_cvv:""
    };

    var type="Map";
    var productId = id;
    $scope.submitQuizCardPayment = function(){
      PaymentFactory.processQuizCardPayment($scope.quiz_card,type,productId)
                      .success(function(data,status){
                          console.log(status + " | " + data);
                      })
                      .error(function(err,code){
                          console.log("err : " + err + " | " + code);
                      });
    }



    $scope.qIndex = 1;
    $scope.manswer = {
      choosen:''
    }

    $scope.nextQuizQuestion = function(){
      $scope.qIndex++;
    }

    $scope.prevQuizQuestion = function(){
      $scope.qIndex--;
    }

    QuizFactory.getQuizDetails(id)
            .success(function(data,status){
                console.log("openQuizDetails");
                $scope.quiz_details = data;
                $scope.answer = $scope.quiz_details.mainQuiz[$scope.qIndex-1].answer;
                var qz = JSON.stringify(data,null,4);

            })
            .error(function(err,code){
                console.log("err " + err + " | " + code);
            });

      $scope.verifyAnswer = function(){
            console.log("answer : " + $scope.answer);
            console.log("choosenAnswer : " + $scope.manswer.choosen);
      }


}]);
