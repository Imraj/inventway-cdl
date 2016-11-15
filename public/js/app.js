var app = angular.module("mhadiab",['ui.router','ngMessages','angular-filepicker','satellizer','ngMap','ngPDFViewer','angular-input-stars']);

app.run(['$rootScope', '$urlRouter', '$location', '$state','$window',"auth","filepickerService",
                              function ($rootScope, $urlRouter, $location, $state,$window,auth,filepickerService) {
    $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
      // Prevent $urlRouter's default handler from firing
      e.preventDefault();

     console.log("state name : " + $state.current.name);

     /*$rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            //event.preventDefault();
          $window.location.reload();
        })
        */
    });

    $rootScope.$on('$locationChangeStart',function(event,nextRoute,currentRoute){
             if( $location.path() == "/new_quiz" && !auth.isLoggedIn())
             {
               $rootScope._authToContinue = true;
               $location.path("/login");

             }
    });

    $rootScope._userId = auth.currentUserId();
    $rootScope._accountType = auth.currentUserAccountType();

}]);

app.directive('fullScreenToggle', function($timeout) {
        return {
              controller: 'mapController',
              link: function(scope, e, a, ctrl) {
              var fullScreenClick = function() {
                  e.parent().toggleClass('full-screen');
                  e.text( e.parent().hasClass('full-screen') ? 'Exit Full Screen' : 'Full Screen' );
                  google.maps.event.trigger(scope.map, 'resize');
              };
              e.on('click', fullScreenClick);
                $timeout(function() {
                  fullScreenClick();
                }, 1000);
            }
        }
});

app.directive('validPasswordC', function() {
      return {
        require: 'ngModel',
        scope: {

          reference: '=validPasswordC'

        },
        link: function(scope, elm, attrs, ctrl) {
          ctrl.$parsers.unshift(function(viewValue, $scope) {

            var noMatch = viewValue != scope.reference
            ctrl.$setValidity('noMatch', !noMatch);
            return (noMatch)?noMatch:!noMatch;
          });

          scope.$watch("reference", function(value) {;
            ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

          });
        }
      }
});


app.config(function (filepickerProvider) {
    filepickerProvider.setKey('AgJlhxtixSnK4e0Hdw3kdz');
});

app.config(function($authProvider){
        $authProvider.facebook({
          clientId:'556643317869901',
          /*name: 'facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
          redirectUri: window.location.origin + '/',
          requiredUrlParams: ['display', 'scope'],
          scope: ['email'],
          scopeDelimiter: ',',
          display: 'popup',
          oauthType: '2.0',
          popupOptions: { width: 580, height: 400 }*/
        });

        $authProvider.google({
              clientId: '125527557077-73tgmckg1rle5kgr2ri54pe5p0j6f7i9.apps.googleusercontent.com',
              /*url: '/auth/google',
              authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
              redirectUri: window.location.origin,
              requiredUrlParams: ['scope'],
              optionalUrlParams: ['display'],
              scope: ['profile', 'email'],
              scopePrefix: 'openid',
              scopeDelimiter: ' ',
              display: 'popup',
              oauthType: '2.0',
              popupOptions: { width: 580, height: 400 }*/
       });

});


app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){

    //---------------------------Book-------------------------
  $stateProvider


    .state("new_book",{
      url:"/new_book",
      cache: false,
      templateUrl:"/new_book.html",
      controller:"BookCtrl",

    })

    .state("books",{
      url:"/books",
      cache: false,
      templateUrl:"/books.html",
      controller:"VBookCtrl",
    })

    .state("book",{
      url:"/book/:id",
      cache: false,
      templateUrl:"/book.html",
      controller:"MBookCtrl",

    })

    .state("book_success",{
            url:"/book_success",
            templateUrl:"/book_success.html"
    })

    .state("book_purchase",{
            url:"/book_purchase",
            templateUrl:"/book_purchase.html",
            controller:"VBookCtrl"
    })
    //--------------------------Map--------------------------------

    .state("new_map",{
      url:"/new_map",
      cache: false,
      templateUrl:"/new_map.html",
      controller:"MMapCtrl",
      onEnter : ["$state","auth",function($state,auth){
          if(!auth.isLoggedIn()){
            $state.go("login");
          }
      }]
    })

    .state("maps",{
      url:"/maps",
      cache: false,
      templateUrl:"/maps.html",
      controller:"VMapCtrl",

    })

    .state("map",{
      url:"/map/:id",
      cache: false,
      templateUrl:"/map.html",
      controller:"IMapCtrl",
      onEnter : ["$state","auth",function($state,auth){
          if(!auth.isLoggedIn()){
            $state.go("login");
          }
      }]
    })

    .state("map_purchase",{
      url:"/map/:id/purchase",
      cache: false,
      templateUrl:"/map_purchase.html",
      controller:"IMapCtrl",
      onEnter : ["$state","auth",function($state,auth){
          if(!auth.isLoggedIn()){
            $state.go("login");
          }
      }]
    })

    .state("map_success",{
       url:"/map_success",
       cache: false,
       templateUrl:"/map_success.html",
       controller:"IMapCtrl"
    })

      //-----------------------------Quiz--------------------------------
    .state("quizzes",{
       url:"/quiz",
       cache: false,
       templateUrl:"/quizzes.html",
       controller:"ViewCtrl"
    })

    .state("new_quiz",{
      url:"/new_quiz",
      cache: false,
      templateUrl:"/new_quiz.html",
      controller:"HomeCtrl",

    })

    .state("quiz",{
       url:"/quiz/:id",
       cache: false,
       templateUrl:"/quiz.html",
       controller:"DetailCtrl"
    })

    .state("quiz_purchase",{
       url:"/quiz/:id/purchase",
       templateUrl:"/quiz_purchase.html",
       controller:"DetailCtrl"
    })

    .state("success",{
       url:"/success",
       cache: false,
       templateUrl:"/quiz_success.html",
       controller:"HomeCtrl"
    })

      //---------------------------Homes--------------------------------------------

    .state("home",{
       url:"/",
       cache: false,
       templateUrl:"/home.html",
       controller:"HomeCtrl"
    })

    .state("adminhome",{
       url:"/adminhome",
       cache: false,
       templateUrl:"/adminhome.html",
       controller:"AdminCtrl"
    })


      //------------------Auth---------------------------------------

    .state("register",{
       url:"/register",
       cache: false,
       templateUrl:"/register.html",
       controller:"RegisterCtrl",
       onEnter : ["$state","auth",function($state,auth){
           if(auth.isLoggedIn()){
             $state.go("home");
           }
       }]
    })

    .state("login",{
       url:"/login",
       cache: false,
       templateUrl:"/login.html",
       controller:"LoginCtrl",
       onEnter : ["$state","auth",function($state,auth){
           if(auth.isLoggedIn()){
             $state.go("home");
           }
       }]
    })

    .state("adminlogin",{
       url:"/adminlogin",
       cache: false,
       templateUrl:"/adminlogin.html",
       controller:"AdminCtrl",
       onEnter : ["$state","auth",function($state,auth){
           if(auth.isLoggedIn()){
             $state.go("adminhome");
           }
       }]
    })

    .state("forgotpassword",{
       url:"/forgot_password",
       cache: false,
       templateUrl:"/forgot_password.html",
       controller:"ResetPasswordCtrl"
    })

    //----------------------------Misc------------------------------------------

    .state("contact",{
       url:"/contact",
       cache: false,
       templateUrl:"/contact.html",
       controller:"ContactCtrl"
    })

    .state("about",{
       url:"/about",
       cache: false,
       templateUrl:"/about.html",
       controller:"HomeCtrl"
    })

    .state("investor",{
       url:"/investor",
       cache: false,
       templateUrl:"/investor.html"
    })

    .state("terms",{
       url:"/terms",
       cache: false,
       templateUrl:"/terms.html"
    })

    .state("privacy",{
       url:"/privacy",
       cache: false,
       templateUrl:"/privacy.html"

    })

    //-------------------------------forum and Blog--------------------------------------


    .state("forum",{
       url:"/forum",
       cache:false,
       templateUrl : "/forum.html"
    })

    .state("blog",{
       url:"/blog",
       cache:false,
       templateUrl : "/blog.html"
    })

    //-------------------------------car--------------------------------------

    .state("new_car",{
        url:"/new_car",
        templateUrl:"/new_car.html",
        controller:"CarController"
      })

      .state("subscription_new_car",{
          url:"/sub_new_car",
          templateUrl:"/subscription_new_car.html",
          controller:"CarController"
        })

    .state("cars",{
          url:"/cars",
          templateUrl:"/cars.html",
          controller:"VCarController"
      })

      .state("car",{
            url:"/car/:id",
            templateUrl:"/car.html",
            controller:"MCarController"
        })

        .state("car_success",{
           url:"/car_success",
           cache: false,
           templateUrl:"/car_success.html",

        })

        //-------------------------------biz--------------------------------------


    .state("bizs",{
            url:"/bizs",
            templateUrl:"/all_biz.html",
            controller:"VBizController"
    })

    .state("biz",{
            url:"/biz/:id",
            templateUrl:"/biz.html",
            controller:"MBizController"
    })

    .state("new_biz",{
            url:"/new_biz",
            templateUrl:"/new_biz.html",
            controller:"BizController"
    })

    .state("biz_success",{
            url:"/biz_success",
            templateUrl:"/biz_success.html",

    })

      //-------------------------------lawfirms--------------------------------------


    .state("new_lawfirm",{
            url:"/new_lawfirm",
            templateUrl:"/new_lawfirm.html",
            controller:"LawController"
    })

    .state("lawfirm_success",{
            url:"/lawfirm_success",
            templateUrl:"/lawfirm_success.html",
            controller:"LawController"
    })

    .state("lawfirms",{
            url:"/lawfirms",
            templateUrl:"/all_lawfirm.html",
            controller:"VLawController"
    })

    .state("lawfirm",{
            url:"/lawfirm/:id",
            templateUrl:"/lawfirm.html",
            controller:"MLawController"
    })

  //-------------------------------Tutors--------------------------------------
    .state("tutors",{
             url:"/tutors",
             templateUrl:"/all_tutor.html",
             controller:"VTutorController"
    })

     .state("tutor",{
             url:"/tutor/:id",
             templateUrl:"/tutor.html",
             controller:"MTutorController"
    })

    .state("new_tutor",{
           url:"/new_tutor",
           templateUrl:"/new_tutor.html",
           controller:"TutorController"
      })

      .state("tutor_success",{
             url:"/tutor_success",
             templateUrl:"/tutor_success.html"
             //controller:"TutorController"
        })
  //-------------------------------Teenager--------------------------------------
  .state("teenagers",{
           url:"/teenagers",
           templateUrl:"/all_teenager.html",
           controller:"VTeenagerController"
  })

   .state("teenager",{
           url:"/teenager/:id",
           templateUrl:"/teenager.html",
           controller:"MTeenagerController"
  })

  .state("new_teenager",{
         url:"/new_teenager",
         templateUrl:"/new_teenager.html",
         controller:"TeenagerController"
    })

    .state("teenager_success",{
           url:"/teenager_success",
           templateUrl:"/teenager_success.html",

      })

   //-------------------------------infograph--------------------------------------

    .state("infographs",{
            url:"/infographs",
            templateUrl:"/all_infograph.html",
            controller:"VInfographController"
    })

     .state("infograph",{
            url:"/infograph/:id",
            templateUrl:"/infograph.html",
            controller:"MInfographController"
    })

    .state("infograph_success",{
            url:"/infograph_success",
            templateUrl:"/infograph_success.html",
            controller:"InfographController"
    })

    .state("new_infograph",{
            url:"/new_infograph",
            templateUrl:"/new_infograph.html",
            controller:"InfographController"
    })

    //-------------------------------inbox messages--------------------------------------

    .state("inbox",{
            url:"/inbox",
            templateUrl:"/inbox.html",
            controller:"InboxController"
    })

    .state("inbox_details",{
            url:"/inbox/:tId/:type",
            templateUrl:"/inbox_details.html",
            controller:"InboxController"
    })

    //------------------------------Edit MyServices

    .state("itutor",{
            url:"/itutor/:userid",
            templateUrl:"/itutor.html",
            controller:"ITutorController"
    })

    .state("itutor_edit",{
            url:"/tutor/:id/edit",
            templateUrl:"/itutor_edit.html",
            controller:"ITutorController"
    })

    .state("iteen",{
            url:"/iteen/:userid",
            templateUrl:"/iteen.html",
            controller:"ITeenController"
    })

    .state("iteen_edit",{
            url:"/teen/:id/edit",
            templateUrl:"/iteen_edit.html",
            controller:"ITeenController"
    })

    .state("idesigner",{
            url:"/idesigner/:userid",
            templateUrl:"/idesigner.html",
            controller:"IDesignerController"
    })

    .state("idesigner_edit",{
            url:"/designer/:id/edit",
            templateUrl:"/idesigner_edit.html",
            controller:"IDesignerController"
    })

    .state("icar",{
            url:"/icar/:userid",
            templateUrl:"/icar.html",
            controller:"ICarController"
    })

    .state("icar_edit",{
            url:"/car/:id/edit",
            templateUrl:"/icar_edit.html",
            controller:"ICarController"
    })

    .state("iquiz",{
            url:"/iquiz/:userid",
            templateUrl:"/icar.html",
            controller:"ICarController"
    })

    .state("iquiz_edit",{
            url:"/iquiz/:userid",
            templateUrl:"/iquiz.html",
            controller:"ICarController"
    })

    .state("imap",{
            url:"/imap/:userid",
            templateUrl:"/imap.html",
            controller:"ICarController"
    })

    .state("imap_edit",{
            url:"/map/:id/edit",
            templateUrl:"/imap_edit.html",
            controller:"ICarController"
    })

    .state("ibook",{
            url:"/ibook/:userid",
            templateUrl:"/ibook.html",
            controller:"ICarController"
    })

    .state("ibook_edit",{
            url:"/book/:id/edit",
            templateUrl:"/ibook_edit.html",
            controller:"ICarController"
    })

    .state("tutor_transaction_type",{
          url:"/tutor/:id/transaction",
          templateUrl:"/tutortransactiontype.html",
          controller:"TutorTransactionCtrl"
    })

    .state("designer_transaction_type",{
          url:"/designer/:id/transaction",
          templateUrl:"/designertransactiontype.html",
          controller:"DesignerTransactionCtrl"
    });

    $urlRouterProvider.otherwise("/");

}]);
