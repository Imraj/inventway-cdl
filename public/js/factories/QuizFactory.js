var app = angular.module("mhadiab");
app.factory("QuizFactory",["$http","$rootScope",function($http,$rootScope){

    var factory = {
      //$scope.quizName,$scope.numberOfQuestions,$scope.quizCategory,$scope.country,$scope.state,$scope.foreignLanguage
        saveQuiz:function(quizName,numberOfQuestions,quizCategory,country,state,foreignLanguage,quizPoster,quiz){
          var thisuserId = $rootScope._userId;
          return $http.post("/save_quiz",{"quizName":quizName,
                                          "numberOfQuestions":numberOfQuestions,
                                          "quizCategory":quizCategory,
                                          "country":country,
                                          "state":state,
                                          "foreignLanguage":foreignLanguage,
                                          "quizPoster":quizPoster,
                                          "quiz":quiz,
                                          "createdBy":thisuserId
                                        }
                          );
        },

        getAllQuiz : function(){
          return $http.get('/all_quiz');
        },

        getQuizDetails : function(id){
          return $http.get('/all_quiz/'+id);
        }

    };

    return factory;

}]);
