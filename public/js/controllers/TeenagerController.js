var app = angular.module("mhadiab");
app.controller("TeenagerController",["$scope","TeenagerFactory","$state","filepickerService",
                                                            function($scope,TeenagerFactory,$state,filepickerService){

    $scope.teenager = {
      firstname:"",
      lastname:"",
      email:"",
      skypeId:"",
      image:"",
      shortIntro:"",
      about:"",
      languages:[],
      categories:[]
    }

    $scope.foreignLanguages = ["French","Turkish","Arabic"];
    $scope.categories = ["Soccer","Politics","Academia","IT"];

    $scope.uploadImage = function(){
        filepickerService.pick({
         mimetype:'image/*',
         language:'en',
         services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','BOX'],
         openTo: 'COMPUTER'
       },function(Blob){
          $scope.teenager.image = Blob.url;
       });
    }

    $scope.toggleSelection = function(flang)
    {
       var indx = $scope.teenager.languages.indexOf(flang);

       if(indx > -1)
       {
         $scope.teenager.languages.splice(indx,1);
       }
       else{
         $scope.teenager.languages.push(flang);
       }

    }


    $scope.toggleCatSelection = function(category)
    {
       var indx = $scope.teenager.categories.indexOf(category);

       if(indx > -1)
       {
         $scope.teenager.categories.splice(indx,1);
       }
       else{
         $scope.teenager.categories.push(category);
       }

    }

    $scope.addTeenager = function(){
        console.log("tut suc : " + JSON.stringify($scope.teenager,null,4));
        TeenagerFactory.addTeenager($scope.teenager)
              .success(function(data,status){
                  console.log("status : " + status);
                  $state.go("teenager_success");
              })
              .error(function(err,code){
                   console.log("err : " + err + " | " + code);
              });
    }

}]);
