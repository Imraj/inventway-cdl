var app = angular.module("mhadiab");
app.controller("BizController",["$scope","BizFactory","$state","filepickerService",function($scope,BizFactory,$state,filepickerService){

    $scope.biz={
      name:"",
      tagline:"",
      category:"",
      description:"",
      address:"",
      openHours:"",
      website:"",
      logo:"",
      email:"",
      facebook:""
    }

    $scope.uploadLogo = function(){
            filepickerService.pick({
               mimetype:'image/*',
               language:'en',
               services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','BOX','IMAGE_SEARCH'],
               openTo: 'COMPUTER'
           },function(Blob){
                $scope.biz.logo = Blob.url;
           });
    }

    $scope.addBiz = function(){
      console.log("add Biz");
      BizFactory.addBiz($scope.biz)
              .success(function(data,status){
                    console.log("data : " + data + " | " + status);
                    $state.go("biz_success");
              })
              .error(function(err,code){
                    console.log("err : " + err + " | " + code);
              });

    }

}]);
