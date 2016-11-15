var app = angular.module("mhadiab");
app.factory("CarFactory",["$http","$rootScope",function($http,$rootScope){

    var carFac = {

        addCar : function(car){
            var thisuserId = $rootScope._userId;
            return $http.post("/add_car",{"car":car,"createdBy":thisuserId});
        },

        getAllCars : function(){
            return $http.post("/view_all_cars");
        },

        viewCar : function(carId){
            return $http.get("/view_car/"+carId);
        }

    }

    return carFac;

}]);
