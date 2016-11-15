var app = angular.module("mhadiab");
app.factory("InboxFactory",["$http","$rootScope",function($http,$rootScope){

    var thisuserId = $rootScope._userId;
    return{
      getUserInbox : function(){

        return $http.get("/get_user_inbox/"+thisuserId);
      },
      sendInboxMessage : function(message,server,type){
          return $http.post("/send_inbox_message",{"message":message,"server":server,"type":type,"client":thisuserId});
      }
    }

}]);
