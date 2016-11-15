var app = angular.module("mhadiab");
app.controller("IMapCtrl",["$scope","$rootScope","$state","NgMap","filepickerService","$window","$stateParams","MapFactory",
      function($scope,$rootScope,$state,NgMap,filepickerService,$window,$stateParams,MapFactory)
      {
        $scope.googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCYvFJvZjNbmoUhWEMSoEwCLgZNRRXb7GY&callback=initMap";

          $scope.map_card = {
            amount:"100",
            type:"master",
            firstname:"",
            lastname:"",
            card_type:"",
            card_number:"",
            card_month:"",
            card_year:"",
            card_cvv:""
          }

          var mapId = $stateParams.id;
          $scope.showCCForm = false;
          $scope.submitMapCardPayment = function(){
            PaymentFactory.processMapCardPayment($scope.map_card,type,productId)
                            .success(function(data,status){
                                console.log(status + " | " + data);
                            })
                            .error(function(err,code){
                                console.log("err : " + err + " | " + code);
                            });
          }

          $scope.markers = [];
          NgMap.getMap().then(function(map){
                   $scope.dmap = map;


            MapFactory.getMap(mapId)
              .success(function(data,status){
                  $scope.amap = data;
                  $scope.location = data.location;

                  for(var k=0;k<$scope.location.length;k++)
                  {
                      var text = $scope.location[k].text;
                      var image = $scope.location[k].image;
                      var video = $scope.location[k].video;
                      var latitude = $scope.location[k].latitude;
                      var longitude = $scope.location[k].longitude;

                      console.log(latitude + " | " + longitude);
                      console.log("map * " + $scope.dmap);
                      var myMarkerLatLng = new google.maps.LatLng( parseFloat(latitude),parseFloat(longitude)  );
                      var myMarker = new google.maps.Marker({position:myMarkerLatLng,map:$scope.dmap});
                      var myInfoWindow = new google.maps.InfoWindow({content:text + "<br/>" + " Image : " +  image + "<br/>" + " Video : " + video});
                           //+ "<br/>" + " Image : " +  image + "<br/>" + " Video : " + video
                      myInfoWindow.open($scope.dmap,myMarker);
                  }

                       console.log("status : " + status);
                       console.log(JSON.stringify(data,null,4));
                   })
                   .error(function(err,code){
                       console.log("Err : " + err + " | code : " + code);
                   });
            });
}]);
