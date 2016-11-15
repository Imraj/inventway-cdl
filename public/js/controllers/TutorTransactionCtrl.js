var app = angular.module("mhadiab");
app.controller("TutorTransactionCtrl",["$scope","PaymentFactory","MyServicesFactory","$stateParams","$window",function($scope,PaymentFactory,MyServicesFactory,$stateParams,$window){


      $scope.showCCForm = false;

      $scope.tutor_card =  {
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

      var type = "Tutor";
      var productId = $stateParams.id;

      $scope.submitTutorCardPayment = function(){
        
          PaymentFactory.processTutorCardPayment($scope.tutor_card,type,productId)
                          .success(function(data,status){
                              console.log(status + " | " + data);
                          })
                          .error(function(err,code){
                              console.log("err : " + err + " | " + code);
                          });
      }

      $scope.submitTutorPaypalPayment = function(){

          PaymentFactory.processTutorPaypalPayment(type,productId)
                          .success(function(data,status){
                              console.log(status + " | " + data);
                              $window.open(data,width="20px",height="20px");
                          })
                          .error(function(err,code){
                              console.log("err : " + err + " | " + code);
                          });
      }



}]);
