var app = angular.module("mhadiab");
app.controller("MMapCtrl",["$scope","$rootScope","$state","NgMap","filepickerService","$window","$compile","MapFactory",
                                                  function($scope,$rootScope,$state,NgMap,filepickerService,$window,$compile,MapFactory){




  var vm = this;

  NgMap.getMap().then(function(map){
      vm.map = map;

  });

  $scope.googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCYvFJvZjNbmoUhWEMSoEwCLgZNRRXb7GY&callback=initMap";

   window.uploadNewVideoMap = function(num)
   {
      filepickerService.pick({
        mimetype:'video/*',
        language:'en',
        services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','BOX'],
        openTo: 'COMPUTER'

      },function(Blob){
           //console.log("uploaded video : " + Blob.url + " | " + num);
           document.getElementById("video_url_"+num).value=Blob.url;
      });
   }

   window.uploadNewImageMap = function(num)
   {
       filepickerService.pick({
         mimetype:'image/*',
         language:'en',
         services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','BOX'],
         openTo: 'COMPUTER'

       },function(Blob){
          //console.log("uploaded image : " + Blob.url + " | num : " + num);
          document.getElementById("image_url_"+num).value=Blob.url;
       });
   }

   $scope.markerCounter = 1;

   var markers = [];
   $scope.addNewMarker = function(e)
   {

         var num = $scope.markerCounter;

         var uimageId = "images"+$scope.markerCounter;

         var image_url = "image_url_"+$scope.markerCounter;
         var video_url = "video_url_"+$scope.markerCounter;
         var descriptionTxt = "text_"+$scope.markerCounter;

         var longitude_id = "longitude_"+$scope.markerCounter;
         var latitude_id = "latitude_"+$scope.markerCounter;

         var longitude = e.latLng.lat();
         var latitude = e.latLng.lng();

         var form = '<div id="form_canvasform">' +
                              '<form name="form_canvas">' +
                              '<textarea class="form-control" required ' + 'id='+descriptionTxt + ' placeholder="Your Text..."></textarea><br/>' +
                              '<button class="btn btn-default" ' + 'id='+uimageId + ' onclick= uploadNewImageMap('+num+') >Upload Image</button>' +
                              '<input type="hidden" ' +'id='+image_url+' >' +
                              '<input type="hidden"' + 'id='+longitude_id+ ' value='+longitude +'/>' +
                              '<input type="hidden"' + 'id='+latitude_id+ ' value='+latitude +'/>' +
                              '<button class="btn btn-default" id="videos" ' + 'onclick=uploadNewVideoMap('+num +')>Upload Video</button><br/>' +
                              '<input type="hidden" ' +'id='+video_url+' >' +
                              '</form>' +
                        '</div>';

         var infoWindow = new google.maps.InfoWindow({content:form});
         var marker = new google.maps.Marker({position: e.latLng, map: vm.map, draggable:true});

         markers.push(marker);

         infoWindow.open(vm.map,marker);

         google.maps.event.addListener(infoWindow,'closeclick',function(){
            marker.setMap(null);
         });

         google.maps.event.addListener(marker, 'position_changed', function() {
            if(infoWindow.getMap()){
              infoWindow.open(vm.map,this);
            }
          });
          $scope.markerCounter += 1;
   }

  $scope.posInfo = {title:"",price:"",location:[]};

   $scope.submitMap = function()
   {

      for(i=1;i<$scope.markerCounter;i++)
      {
        var text = document.getElementById("text_"+i).value;
        var image = document.getElementById("image_url_"+i).value;
        var video = document.getElementById("video_url_"+i).value;
        var lat = document.getElementById("latitude_"+i).value;
        var lng = document.getElementById("longitude_"+i).value;

        $scope.posInfo.location.push({text:text,image:image,video:video,latitude:lat,longitude:lng});

        /*console.log("showing item : " + i);
        console.log("text is : " + document.getElementById("text_"+i).value);
        console.log("image_url is : " + document.getElementById("image_url_"+i).value);
        console.log("video_url is : " + document.getElementById("video_url_"+i).value);
        console.log("latitude is : " + document.getElementById("latitude_"+i).value);
        console.log("longitude is : " + document.getElementById("longitude_"+i).value);
        console.log("----------------------------------------------------");
        */

        }
        MapFactory.submitMap($scope.posInfo)
                .success(function(data,status){
                    console.log("data : " + data + " | status : " + status);
                    $state.go("map_success");
                })
                .error(function(err,info){
                    console.log( "err : " + err + " | info : " + info );
                });


   }


}]);
