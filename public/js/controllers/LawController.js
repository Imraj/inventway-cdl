var app = angular.module("mhadiab");
app.controller("LawController",["$scope","LawFactory","$state",function($scope,LawFactory,$state){

    $scope.firm={
      name:"",
      tagline:"",
      category:"",
      description:"",
      address:"",
      logo:"",
      openHours:"",
      website:"",
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
                $scope.firm.logo = Blob.url;
           });
    }

    $scope.addLawFirm = function(){
      console.log("firm : * " + JSON.stringify($scope.firm,null,4));
      LawFactory.addFirm($scope.firm)
              .success(function(data,status){
                    console.log("data : " + data + " | " + status);
                    $state.go("lawfirm_success");
              })
              .error(function(err,code){
                    console.log("err : " + err + " | " + code);
              });

    }

}]);
