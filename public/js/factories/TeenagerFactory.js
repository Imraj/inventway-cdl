var app = angular.module("mhadiab");
app.factory("TeenagerFactory",["$http","$rootScope",function($http,$rootScope){

      var fac = {
          addTeenager : function(teenager){
                var thisuserId = $rootScope._userId;
              return $http.post("/add_teenager",{"teenager":teenager,"createdBy":thisuserId});
          },

          getAllTeenagers : function(){
               return $http.get("/all_teenagers");
          },

          getTeenager : function(teenagerId)
          {
            return $http.get("/view_teenager/"+teenagerId);
          }

      }

      return fac;

}]);
