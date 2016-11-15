var app = angular.module("mhadiab");
app.controller("VMapCtrl",["$scope","$rootScope","$state","NgMap","filepickerService","$window","$compile","MapFactory",
              function($scope,$rootScope,$state,NgMap,filepickerService,$window,$compile,MapFactory)
             {
               MapFactory.getAllMaps()
                   .success(function(data,status){
                       $scope.all_maps = data;
                       console.log("status : " + status);
                       console.log(JSON.stringify(data,null,4));
                   })
                   .error(function(err,code){
                       console.log("Err : " + err + " | code : " + code);
                   });

             }]);
