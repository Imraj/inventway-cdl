var app = angular.module("mhadiab");
app.controller("DesignerTransactionCtrl",["$scope","MyServicesFactory","$stateParams",function($scope,MyServicesFactory,$stateParams){


      $scope.showCCForm = false;

      $scope.designer_card =  {
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

      var type = "Infographer";
      var productId = $stateParams.id;

      $scope.submitDesignerCardPayment = function(){
          console.log("tc : " + JSON.stringify($scope.designer_card));
          PaymentFactory.processDesignerCardPayment($scope.designer_card,type,productId)
                          .success(function(data,status){
                              console.log(status + " | " + data);
                          })
                          .error(function(err,code){
                              console.log("err : " + err + " | " + code);
                          });
      }

      $scope.submitDesignerPaypalPayment = function(){

          PaymentFactory.processDesignerPaypalPayment(type,productId)
                          .success(function(data,status){
                              console.log(status + " | " + data);
                          })
                          .error(function(err,code){
                              console.log("err : " + err + " | " + code);
                          });
      }


}]);
