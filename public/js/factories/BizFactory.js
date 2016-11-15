var app = angular.module("mhadiab");
app.factory("BizFactory",["$http","$rootScope",function($http,$rootScope){

    return {
        addBiz : function(biz){
              return $http.post("/add_biz",{"biz":biz});
        },
        getAllBiz : function(){
            return $http.get("/view_all_biz");
        },
        getBiz : function(bizId){
            return $http.get("/view_biz/"+bizId);
        },
        submitComment:function(bizId,text){
            return $http.post("/submit_biz_comment",{"bizId":bizId,"text":text});
        },
        updateRatings:function(bizId,userId){
            return $http.post("/update_biz_ratings",{"biz":bizId,"user":userId});
        }
    }

}]);
