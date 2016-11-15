var app = angular.module("mhadiab");
app.controller("TutorController",["$scope","TutorFactory","$state","filepickerService",
                                                            function($scope,TutorFactory,$state,filepickerService){

    $scope.tutor = {
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

    $scope.toggleSelection = function(category){

        var indx = $scope.tutor.categories.indexOf(category);

        if(indx > -1){
           $scope.tutor.categories.splice(indx,1);
        }
        else{
           $scope.tutor.categories.push(category);
        }

    }

    $scope.toggleLangSelection = function(lang)
    {
      var indxl = $scope.tutor.languages.indexOf(lang);

      if(indxl > -1){
         $scope.tutor.languages.splice(indxl,1);
      }
      else{
         $scope.tutor.languages.push(lang);
      }
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
          $scope.tutor.image = Blob.url;
       });
    }

    $scope.addTutor = function(){
        console.log("tut suc : " + JSON.stringify($scope.tutor,null,4));
        TutorFactory.addTutor($scope.tutor)
              .success(function(data,status){
                  console.log("status : " + status);
                  $state.go("tutor_success");
              })
              .error(function(err,code){
                   console.log("err : " + err + " | " + code);
              });
    }

}]);
