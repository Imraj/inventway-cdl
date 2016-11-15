var app = angular.module("mhadiab");
app.controller("InfographController",["$scope","filepickerService","$state","InfographFactory",function($scope,filepickerService,$state,InfographFactory){

    $scope.designer = {
      image:"",
      firstname:"",
      lastname:"",
      email:"",
      skypeId:"",
      shortIntro:"",
      about:"",
      portfolio:[],
      categories:[]
    }

    $scope.toggleSelection = function(category)
    {
        var indx = $scope.designer.categories.indexOf(category);

        if(indx > -1)
        {
          $scope.designer.categories.splice(indx,1);
        }
        else{
          $scope.designer.categories.push(category);
        }
    }

    $scope.categories = ["Sport","Music","Physics","Economics","Soccer","Politics"];

    $scope.uploadPortfolio = function(){
       filepickerService.pick({
         mimetype:"image/*",
         language:"en",
         services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','BOX'],
         openTo: 'COMPUTER'
       },function(Blob){
            $scope.designer.portfolio.push(Blob.url);
       });
    }

    $scope.uploadImage = function(){
       filepickerService.pick({
         mimetype:"image/*",
         language:"en",
         services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','BOX'],
         openTo: 'COMPUTER'
       },function(Blob){
            $scope.designer.image = Blob.url;
       });
    }

    $scope.addDesigner = function(){
        console.log("designer info : " + JSON.stringify($scope.designer,null,4));
        InfographFactory.addDesigner($scope.designer)
                        .success(function(data,status){
                            console.log("status : " + status + " | " + JSON.stringify(data,null,4));

                            $state.go("infograph_success");
                        })
                        .error(function(err,code){
                            console.log("err : " + err + " | " + code);
                        });

    }

}]);
