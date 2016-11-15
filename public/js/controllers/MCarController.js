var app = angular.module("mhadiab");
app.controller("MCarController",["$scope","CarFactory","$stateParams",function($scope,CarFactory,$stateParams){

  var id = $stateParams.id;

  $scope.showCCForm = false;
  $scope.car_card = {
    amount:"100",
    type:"master",
    firstname:"",
    lastname:"",
    card_type:"",
    card_number:"",
    card_month:"",
    card_year:"",
    card_cvv:""
  };

  var type = "Car";
  var productId = id;

  $scope.submitCarCardPayment = function(){
      console.log("tc : " + JSON.stringify($scope.car_card));
      PaymentFactory.processCarCardPayment($scope.car_card,type,productId)
                      .success(function(data,status){
                          console.log(status + " | " + data);
                      })
                      .error(function(err,code){
                          console.log("err : " + err + " | " + code);
                      });
  }

  $scope.submitCarPaypalPayment = function(){

      PaymentFactory.processCarPaypalPayment(type,productId)
                      .success(function(data,status){
                          console.log(status + " | " + data);
                      })
                      .error(function(err,code){
                          console.log("err : " + err + " | " + code);
                      });
  }

  $scope.car_features = ["Air Conditioning","Airbags","Alloy Wheels","AM/FM Radio","Anti-lock Brakes","Armrests","Cd Player","Cup Holders","Electric Mirrors",
                          "Electric Windows","External Winch","Fog Lights","Front Fog Lamps","Keyless Entry","Power Steering","Rear Camera","Spotlight",
                          "Sunroof","Tinted Windows","Traction Control","Wheel Locks","Winch","Xenon Lights"
                        ];

  CarFactory.viewCar(id)
            .success(function(data,status){
                $scope.car = data;
                console.log("status : " + status + " | " + JSON.stringify($scope.car,null,4));
            })
            .error(function(err,code){
                console.log("err : " + err + " | " + code);
            });

}]);
