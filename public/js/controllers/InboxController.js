var app = angular.module("mhadiab");
app.controller("InboxController",["$scope","InboxFactory","$stateParams",function($scope,InboxFactory,$stateParams){


    var serverId = $stateParams.tId;
    var type = $stateParams.type;
    $scope.inbox = {message:""};

    $scope.sendInboxMessage = function(){
        InboxFactory.sendInboxMessage($scope.inbox.message,serverId)
                   .success(function(data,status){
                      console.log("data : " + data + " | " + status);
                   })
                   .error(function(err,code){
                        console.log("err : " + err + " | " + code);
                   });
    }

}]);
