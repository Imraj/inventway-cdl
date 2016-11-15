var app = angular.module("mhadiab");
app.factory("MyServicesFactory",["$http","$rootScope",function($http,$rootScope){
    var thisuserId = $rootScope._userId;
    return {
      getITeen:function(){
          return $http.post("/view_iteens",{"uId":thisuserId});
      },

      getITutor:function(){
          return $http.post("/view_itutor",{"uId":thisuserId});
      },

      getIDesigner:function(){
          return $http.post("/view_idesigner",{"uId":thisuserId});
      },

      getICar:function(){

          return $http.post("/view_icar",{"uId":thisuserId});
      },
      getIQuiz:function(){

          return $http.post("/view_iquiz",{"uId":thisuserId});
      }

    }

}]);
