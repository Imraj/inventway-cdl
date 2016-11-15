var app = angular.module("mhadiab");
app.factory('auth',["$http","$window",function($http,$window){

        var auth = {};
        auth.saveToken = function(token){
            $window.localStorage['mhadiab-token'] = token;
        };

        auth.getToken = function(){
          return $window.localStorage['mhadiab-token'];
        };

        auth.isLoggedIn = function(){
            var token = auth.getToken();
            console.log("isLoggedIn token : " + token);
            if(token){
              var payload = JSON.parse($window.atob(token.split('.')[1]));
              console.log("payload  ee : " + JSON.stringify(payload,null,4) );
              return payload.exp > Date.now()/1000;
            }
            else {
              return false;
            }
        };

        auth.currentUser = function(){
            if(auth.isLoggedIn()){
              var token = auth.getToken();
              var payload = JSON.parse($window.atob(token.split('.')[1]));

              return payload.email;
            }
       };

       auth.currentUserId = function(){
           if(auth.isLoggedIn()){
             var token = auth.getToken();
             var payload = JSON.parse($window.atob(token.split('.')[1]));

             return payload._id;
           }
      };

      auth.currentUserAccountType = function(){
          if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.accountType;
          }
      };

       auth.register = function(user){
          return $http.post('/register', user).success(function(data){
            console.log(JSON.stringify(data,null,4));
            auth.saveToken(data.token);
          });
      };

      auth.logIn = function(user){
        return $http.post('/login', user).success(function(data){
          auth.saveToken(data.token);
        });
      };

      auth.adminLogin = function(admin){
        return $http.post('/adminlogin',admin).success(function(data){
          //
        });
      }

      auth.logOut = function(){
        $window.localStorage.removeItem('mhadiab-token');
      };

      auth.submitContactForm = function(contactMessage){
         return $http.get("/submit_contact",contactMessage);
      }

      return auth;
}]);
