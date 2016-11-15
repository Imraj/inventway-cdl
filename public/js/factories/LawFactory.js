
var app = angular.module("mhadiab");
app.factory("LawFactory",["$http","$rootScope",function($http,$rootScope){

    var fac =  {
        addFirm : function(firm){
              return $http.post("/add_lawfirm",{"firm":firm});
        },
        getAllFirm : function(){
            return $http.get("/view_all_lawfirm");
        },
        getFirm : function(lawfirmId){
            return $http.get("/view_lawfirm/"+lawfirmId);
        },
        submitComment:function(firmId,userId){
            return $http.post("/submit_firm_comment",{"firm":firmId,"user":userId});
        },
        updateRatings:function(bizId,userId){
            return $http.post("/update_firm_ratings",{"firm":firmId,"user":userId});
        }
    };

    return fac;

}]);
