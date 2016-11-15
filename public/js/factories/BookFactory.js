var app = angular.module("mhadiab");
app.factory("BookFactory",["$http","$rootScope",function($http,$rootScope){

    var fac = {
        convertPdfFile : function(){
            return $http.post("/translate_test");
        },

        downloadFile : function(fileId){
            return $http.post("/download_tfile",{fileId});
        },

        getAllBooks : function(){
            return $http.get("/get_all_books");
        },

        getBook : function(bookId){
            return $http.post("/get_book",{"bookId":bookId});
        }
    }

    return fac;
}]);
