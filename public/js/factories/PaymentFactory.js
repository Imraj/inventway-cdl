var app = angular.module("mhadiab");
app.factory("PaymentFactory",["$http","$rootScope",function($http,$rootScope){
  var thisuserId = $rootScope._userId;
  return{
     processTutorCardPayment : function(card_details,trans_type,productId){
        return $http.post("/process_tutor_card",{"card":card_details,"type":trans_type,"productId":productId,"createdBy":thisuserId});
     },
     processTutorPaypalPayment : function(trans_type,productId){
        return $http.post("/process_tutor_paypal",{"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processDesignerCardPayment : function(card_details,trans_type,productId){
        return $http.post("/process_designer_card",{"card":card_details,"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processDesignerPaypalPayment : function(trans_type,productId){
        return $http.post("/process_designer_paypal",{"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processMapCardPayment:function(card_details,trans_type,productId)
     {
        return $http.post("/process_map_card",{"card":card_details,"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processMapPaypalPayment : function(trans_type,productId){
        return $http.post("/process_map_paypal",{"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processQuizCardPayment:function(card_details,trans_type,productId)
     {
        return $http.post("/process_quiz_card",{"card":card_details,"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processQuizPaypalPayment : function(trans_type,productId){
        return $http.post("/process_quiz_paypal",{"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processBookCardPayment:function(card_details,trans_type,productId)
     {
        return $http.post("/process_book_card",{"card":card_details,"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processBookPaypalPayment : function(trans_type,productId){
        return $http.post("/process_book_paypal",{"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processCarCardPayment:function(card_details,trans_type,productId)
     {
        return $http.post("/process_car_card",{"card":card_details,"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
     processCarPaypalPayment : function(trans_type,productId){
        return $http.post("/process_car_paypal",{"createdBy":thisuserId,"type":trans_type,"productId":productId});
     },
  }

}]);
