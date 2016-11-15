var app = angular.module("mhadiab");
app.controller("HomeCtrl",["$scope","QuizFactory","$window","$state","filepickerService",function($scope,QuizFactory,$window,$state,filepickerService){
                      console.log("reloading state.....");

                          $scope.quiz = [];

                          $scope.createQuizArray = function(){
                                console.log("n o q :" + $scope.numberOfQuestions);
                                for(var k=0;k<$scope.numberOfQuestions;k++)
                                {

                                  $scope.quiz.push({
                                          questionImage:'',
                                          text:'',
                                          optionA:'',
                                          optionB:'',
                                          optionC:'',
                                          answer:'',
                                          keywords:'',
                                          terms:[
                                            {word:'',description:'',image:''}
                                          ]
                                     });
                                 }
                          }



                            $scope.getNumber = function(n)
                            {
                                var x = Array();
                                for(var i=0;i<n;i++)
                                {
                                      x.push(i);
                                }
                                return x;
                            }

                            $scope.upload = function(index1,index2){
                                  filepickerService.pick({
                                            mimetype: 'image/*',
                                           language: 'en',
                                           services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                                           openTo: 'IMAGE_SEARCH'
                                  },function(Blob){
                                      console.log(JSON.stringify(Blob));
                                      $scope.quiz[index1].terms[index2].image = Blob;
                                      $scope.$apply();

                                  });
                            }

                            $scope.uploadQuizPoster = function()
                            {
                                filepickerService.pick({
                                          mimetype: 'image/*',
                                         language: 'en',
                                         services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                                         openTo: 'IMAGE_SEARCH'
                                },function(Blob){
                                    console.log(JSON.stringify(Blob));
                                    $scope.quizPoster = Blob;
                                    $scope.$apply();
                                    console.log($scope.quizPoster);
                                });
                            }

                            $scope.uploadQuizQuestionImage = function(dnum)
                            {
                              filepickerService.pick({
                                        mimetype: 'image/*',
                                       language: 'en',
                                       services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                                       openTo: 'IMAGE_SEARCH'
                              },function(Blob){
                                  console.log(JSON.stringify(Blob));
                                  $scope.quiz[dnum].questionImage = Blob.url;
                              });
                            }

                            $scope.createQuiz = function()
                            {
                                  console.log("Questions");
                                  console.log("quizName :" + $scope.quizName);
                                  console.log("numberOfQuestions : " + $scope.numberOfQuestions);
                                  console.log("quizCategory : " + $scope.quizCategory);
                                  console.log("country : " + $scope.country);
                                  console.log("state : " + $scope.state);
                                  console.log("FL: " + $scope.foreignLanguage);
                                  console.log("quizPoster : " + $scope.quizPoster.url)

                                  for(var i=0;i<$scope.numberOfQuestions;i++)
                                  {
                                    console.log("quiz is : " + $scope.quiz[i]);
                                    console.log("question is : " + $scope.quiz[i].text);
                                    console.log("optionA is : " + $scope.quiz[i].optionA);
                                    console.log("optionB is : " + $scope.quiz[i].optionB);
                                    console.log("optionC is : " + $scope.quiz[i].optionC);
                                    console.log("answer : " + $scope.quiz[i].answer);
                                    console.log("keywords : " + $scope.quiz[i].keywords);
                                    console.log("question Image : " + $scope.quiz[i].questionImage);
                                    for(var m=0;m<$scope.quiz[i].terms.length;m++)
                                    {
                                      console.log("term " + m + ":" + $scope.quiz[i].terms[m].word + " && " + $scope.quiz[i].terms[m].description + " && " + $scope.quiz[i].terms[m].image );
                                    }
                                  }

                                  QuizFactory.saveQuiz($scope.quizName,$scope.numberOfQuestions,$scope.quizCategory,$scope.country,$scope.state,
                                                                        $scope.foreignLanguage,$scope.quizPoster.url,$scope.quiz)
                                            .success(function(data,status){
                                                console.log("Succ : " + data + " | " + status);
                                            })
                                            .error(function(err,code){
                                                console.log("Err : " + err + " | " + code);
                                            });

                                            $state.go("success");
                            }

                            $scope.step = 0;

                            $scope.terms = [{word:'',description:''}];
                            $scope.addNewWord = function(index){

                                $scope.quiz[index].terms.push({word:'',description:''});
                            }

                            $scope.removeWord = function(){
                               var lastItem = $scope.choices.length-1;
                               $scope.terms.splice(lastItem)
                            }

                            $scope.nextStep = function(){
                              $scope.step++;
                              console.log($scope.step);
                            }

                            $scope.prevStep = function(){
                              $scope.step--;
                            }

                            $scope.countries = [
                                      "Afghanistan",
                                      "Åland Islands",
                                      "Albania",
                                      "Algeria",
                                      "American Samoa",
                                      "Andorra",
                                      "Angola",
                                      "Anguilla",
                                      "Antarctica",
                                      "Antigua and Barbuda",
                                      "Argentina",
                                      "Armenia",
                                      "Aruba",
                                      "Australia",
                                      "Austria",
                                      "Azerbaijan",
                                      "Bahamas",
                                      "Bahrain",
                                      "Bangladesh",
                                      "Barbados",
                                      "Belarus",
                                      "Belgium",
                                      "Belize",
                                      "Benin",
                                      "Bermuda",
                                      "Bhutan",
                                      "Bolivia, Plurinational State of",
                                      "Bonaire, Sint Eustatius and Saba",
                                      "Bosnia and Herzegovina",
                                      "Botswana",
                                      "Bouvet Island",
                                      "Brazil",
                                      "British Indian Ocean Territory",
                                      "Brunei Darussalam",
                                      "Bulgaria",
                                      "Burkina Faso",
                                      "Burundi",
                                      "Cambodia",
                                      "Cameroon",
                                      "Canada",
                                      "Cape Verde",
                                      "Cayman Islands",
                                      "Central African Republic",
                                      "Chad",
                                      "Chile",
                                      "China",
                                      "Christmas Island",
                                      "Cocos (Keeling) Islands",
                                      "Colombia",
                                      "Comoros",
                                      "Congo",
                                      "Congo, the Democratic Republic of the",
                                      "Cook Islands",
                                      "Costa Rica",
                                      "Côte d Ivoire",
                                      "Croatia",
                                      "Cuba",
                                      "Curaçao",
                                      "Cyprus",
                                      "Czech Republic",
                                      "Denmark",
                                      "Djibouti",
                                      "Dominica",
                                      "Dominican Republic",
                                      "Ecuador",
                                      "Egypt",
                                      "El Salvador",
                                      "Equatorial Guinea",
                                      "Eritrea",
                                      "Estonia",
                                      "Ethiopia",
                                      "Falkland Islands (Malvinas)",
                                      "Faroe Islands",
                                      "Fiji",
                                      "Finland",
                                      "France",
                                      "French Guiana",
                                      "French Polynesia",
                                      "French Southern Territories",
                                      "Gabon",
                                      "Gambia",
                                      "Georgia",
                                      "Germany",
                                      "Ghana",
                                      "Gibraltar",
                                      "Greece",
                                      "Greenland",
                                      "Grenada",
                                      "Guadeloupe",
                                      "Guam",
                                      "Guatemala",
                                      "Guernsey",
                                      "Guinea",
                                      "Guinea-Bissau",
                                      "Guyana",
                                      "Haiti",
                                      "Heard Island and McDonald Islands",
                                      "Holy See (Vatican City State)",
                                      "Honduras",
                                      "Hong Kong",
                                      "Hungary",
                                      "Iceland",
                                      "India",
                                      "Indonesia",
                                      "Iran, Islamic Republic of",
                                      "Iraq",
                                      "Ireland",
                                      "Isle of Man",
                                      "Israel",
                                      "Italy",
                                      "Jamaica",
                                      "Japan",
                                      "Jersey",
                                      "Jordan",
                                      "Kazakhstan",
                                      "Kenya",
                                      "Kiribati",
                                      "Korea, Democratic People\'s Republic of",
                                      "Korea, Republic of",
                                      "Kuwait",
                                      "Kyrgyzstan",
                                      "Lao People\'s Democratic Republic",
                                      "Latvia",
                                      "Lebanon",
                                      "Lesotho",
                                      "Liberia",
                                      "Libya",
                                      "Liechtenstein",
                                      "Lithuania",
                                      "Luxembourg",
                                      "Macao",
                                      "Macedonia, the former Yugoslav Republic of",
                                      "Madagascar",
                                      "Malawi",
                                      "Malaysia",
                                      "Maldives",
                                      "Mali",
                                      "Malta",
                                      "Marshall Islands",
                                      "Martinique",
                                      "Mauritania",
                                      "Mauritius",
                                      "Mayotte",
                                      "Mexico",
                                      "Micronesia, Federated States of",
                                      "Moldova, Republic of",
                                      "Monaco",
                                      "Mongolia",
                                      "Montenegro",
                                      "Montserrat",
                                      "Morocco",
                                      "Mozambique",
                                      "Myanmar",
                                      "Namibia",
                                      "Nauru",
                                      "Nepal",
                                      "Netherlands",
                                      "New Caledonia",
                                      "New Zealand",
                                      "Nicaragua",
                                      "Niger",
                                      "Nigeria",
                                      "Niue",
                                      "Norfolk Island",
                                      "Northern Mariana Islands",
                                      "Norway",
                                      "Oman",
                                      "Pakistan",
                                      "Palau",
                                      "Palestinian Territory, Occupied",
                                      "Panama",
                                      "Papua New Guinea",
                                      "Paraguay",
                                      "Peru",
                                      "Philippines",
                                      "Pitcairn",
                                      "Poland",
                                      "Portugal",
                                      "Puerto Rico",
                                      "Qatar",
                                      "Réunion",
                                      "Romania",
                                      "Russian Federation",
                                      "Rwanda",
                                      "Saint Barthélemy",
                                      "Saint Helena, Ascension and Tristan da Cunha",
                                      "Saint Kitts and Nevis",
                                      "Saint Lucia",
                                      "Saint Martin (French part)",
                                      "Saint Pierre and Miquelon",
                                      "Saint Vincent and the Grenadines",
                                      "Samoa",
                                      "San Marino",
                                      "Sao Tome and Principe",
                                      "Saudi Arabia",
                                      "Senegal",
                                      "Serbia",
                                      "Seychelles",
                                      "Sierra Leone",
                                      "Singapore",
                                      "Sint Maarten (Dutch part)",
                                      "Slovakia",
                                      "Slovenia",
                                      "Solomon Islands",
                                      "Somalia",
                                      "South Africa",
                                      "South Georgia and the South Sandwich Islands",
                                      "South Sudan",
                                      "Spain",
                                      "Sri Lanka",
                                      "Sudan",
                                      "Suriname",
                                      "Svalbard and Jan Mayen",
                                      "Swaziland",
                                      "Sweden",
                                      "Switzerland",
                                      "Syrian Arab Republic",
                                      "Taiwan, Province of China",
                                      "Tajikistan",
                                      "Tanzania, United Republic of",
                                      "Thailand",
                                      "Timor-Leste",
                                      "Togo",
                                      "Tokelau",
                                      "Tonga",
                                      "Trinidad and Tobago",
                                      "Tunisia",
                                      "Turkey",
                                      "Turkmenistan",
                                      "Turks and Caicos Islands",
                                      "Tuvalu",
                                      "Uganda",
                                      "Ukraine",
                                    "United Arab Emirates",
                                      "United Kingdom",
                                      "United States",
                                      "United States Minor Outlying Islands",
                                      "Uruguay",
                                      "Uzbekistan",
                                      "Vanuatu",
                                      "Venezuela, Bolivarian Republic of",
                                      "Viet Nam",
                                      "Virgin Islands, U.S.",
                                      "Wallis and Futuna",
                                      "Western Sahara",
                                      "Yemen",
                                      "Zambia",
                                      "Zimbabwe"
                          ];

                          $scope.quizoptions = [
                            "Sport",
                            "Education",
                            "Entertainment",
                            "Solar System"
                          ];

                          $scope.foreignlanguages = [
                                "Spanish",
                                "French",
                                "German",
                                "Italian",
                                "Japanese",
                                "Chinese",
                                "Arabic",
                                "Latin",
                                "Russian",
                                "Greek",
                                "Hebrew",
                                "Portuguese",
                                "Korean"
                          ];

                          $scope.states = [
                              "Alabama",
                              "Alaska",
                              "Arizona",
                              "Arkansas",
                              "California",
                              "Colorado",
                              "Connecticut",
                              "Delaware",
                              "Florida",
                              "Georgia",
                              "Hawaii",
                              "Idaho",
                              "Illinois",
                              "Indiana",
                              "Iowa",
                              "Kansas",
                              "Kentucky",
                              "Louisiana",
                              "Maine",
                              "Maryland",
                              "Massachusetts",
                              "Michigan",
                              "Minnesota",
                              "Mississippi",
                              "Missouri",
                              "Montana",
                              "Nebraska",
                              "Nevada",
                              "New Hampshire",
                              "New Jersey",
                              "New Mexico",
                              "New York",
                              "North Carolina",
                              "North Dakota",
                              "Ohio",
                              "Oklahoma",
                              "Oregon",
                              "Pennsylvania",
                              "Rhode Island",
                              "South Carolina",
                              "South Dakota",
                              "Tennessee",
                              "Texas",
                              "Utah",
                              "Vermont",
                              "Virginia",
                              "Washington",
                              "West Virginia",
                              "Wisconsin",
                              "Wyoming",
                              "Others"
                          ];

}]);
