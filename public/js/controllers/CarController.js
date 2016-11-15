var app = angular.module("mhadiab");
app.controller("CarController",["$scope","filepickerService","CarFactory","$state",function($scope,filepickerService,CarFactory,$state){

    $scope.car = {
      name:"",
      year:"",
      price:"",
      description:"",
      features:[],
      images:[],
      video:"",
      email:"",
      skype:""
    };

    $scope.number_of_images = 3;

    $scope.arrayImg = [1,2,3];

    $scope.moreCarImage = function(){
       $scope.number_of_images +1;
       $scope.arrayImg.push($scope.number_of_images);
    }

    $scope.car_features = ["Air Conditioning","Airbags","Alloy Wheels","AM/FM Radio","Anti-lock Brakes","Armrests","Cd Player","Cup Holders","Electric Mirrors",
                            "Electric Windows","External Winch","Fog Lights","Front Fog Lamps","Keyless Entry","Power Steering","Rear Camera","Spotlight",
                            "Sunroof","Tinted Windows","Traction Control","Wheel Locks","Winch","Xenon Lights"
                          ];

    $scope.submitCar = function(){



        CarFactory.addCar($scope.car)
                  .success(function(data,status){
                      console.log(JSON.stringify($scope.car));
                      console.log("data " + JSON.stringify(data,null,4));
                      console.log("Car added status " + status);
                      $state.go("car_success");
                  })
                  .error(function(err,code){
                      console.log("err : " + err + ' | ' + code);
                  });

    }

    $scope.uploadCarImage = function(num)
    {
        filepickerService.pick({
          mimetype: 'image/*',
          language: 'en',
          services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
          openTo: 'COMPUTER'
        },function(Blob){
            $scope.carImageUrl = Blob.url;
            $scope.car.images[num] = $scope.carImageUrl;
            //console.log("car Image url : " + $scope.carImageUrl + " | " + num);
        });
    };

    $scope.uploadCarVideo = function()
    {
        filepickerService.pick({
          mimetype: 'video/*',
          language: 'en',
          services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE'],
          openTo: 'COMPUTER'
        },function(Blob){
            $scope.car.video = Blob.url;
        });
    };

}]);
