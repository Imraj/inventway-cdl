var app = angular.module("mhadiab");
app.factory("TutorFactory",["$http","$rootScope",function($http,$rootScope){
      var thisuserId = $rootScope._userId;
      var fac = {
          addTutor : function(tutor)
          {
              return $http.post("/add_tutor",{"tutor":tutor,"createdBy":thisuserId});
          },

          getAllTutors : function()
          {
               return $http.get("/all_tutors");
          },

          getTutor : function(tutorId)
          {
            return $http.get("/view_tutor/"+tutorId);
          },

          verify_payment_and_access : function(tutorId)
          {
             return $http.post("/verify_payment_and_access",{"tutorId":tutorId,"userId":thisuserId,"type":"Tutor"});
          }

      }

      return fac;

}]);
