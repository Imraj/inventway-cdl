var app = angular.module("mhadiab");
app.factory("InfographFactory",["$http","$rootScope",function($http,$rootScope){

    return{

        addDesigner:function(designer)
        {
             var thisuserId = $rootScope._userId;
           return $http.post("add_designer",{"designer":designer,"createdBy":thisuserId});
        },

        getAllDesigners : function(){
            return $http.post("view_all_designers");
        },

        getDesigner:function(designerId){
             return $http.get("/view_designer/"+designerId);
        }

    }

}]);
