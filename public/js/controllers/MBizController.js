var app = angular.module("mhadiab");
app.controller("MBizController",["$scope","$stateParams","BizFactory",function($scope,$stateParams,BizFactory){

      console.log("At MBizController");
      $scope.showCommentForm = false;
      var id = $stateParams.id;

      $scope.mbiz = {};

      $scope.comment={
          text:"",
          user:""
      }

      BizFactory.getBiz(id)
            .success(function(data,status){
                $scope.biz = data;
                console.log("status : " + status + " | " + data);
            })
            .error(function(err,code){
                  console.log("err : " + err + " | " + code);
            });

      $scope.submitComment = function(bizId){
            BizFactory.submitComment(bizId,comment.text)
                  .success(function(data,status){
                      console.log("data : " + data + " | " + status );
                  })
                  .error(function(err,code){
                      console.log("err : " + err + " | " + code);
                  });
        }

      $scope.updateRatings = function(){
            BizFactory.updateRatings(id)
                    .success(function(data,status){
                        console.log("data : " + data + " | " + status );
                    })
                    .error(function(err,code){
                        console.log("err : " + err + " | " + code);
                    });
            }

}]);
