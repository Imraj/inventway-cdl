var app = angular.module("mhadiab");
app.factory("MapFactory",["$http","$rootScope",function($http,$rootScope){

    var mapfac = {
          submitMap : function(title,location,price){
             var thisuserId = $rootScope._userId;
             return $http.post("/submit_map",{title:title,location:location,price:price,userId:thisuserId});
          },

          getAllMaps : function(){
             return $http.post("/all_maps");
          },

          getMap : function(mapId){
            return $http.get("/all_maps/"+mapId);
          }

    };


    return mapfac;

}]);
