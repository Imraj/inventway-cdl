var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');

var request = require('request');
var fs = require('fs');


var Term = mongoose.model("Term");
var Question = mongoose.model("Question");
var Quiz = mongoose.model("Quiz");
var User = mongoose.model("User");
var Map = mongoose.model("Map");
var Car = mongoose.model("Car");
var Tutor = mongoose.model("Tutor");
var Biz = mongoose.model("Biz");
var Lawyer = mongoose.model("Lawyer");
var Infographer = mongoose.model("Infographer");
var BizComment = mongoose.model("BizComment");
var FirmComment = mongoose.model("FirmComment");
var Inbox = mongoose.model("Inbox");
var Teenager = mongoose.model("Teenager");
var VContact = mongoose.model("VContact");
var UContact = mongoose.model("UContact");
var Payment = mongoose.model("Payment");

var jwt = require('jwt-simple');
var session = require('express-session');
//var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var options = {
        auth: {
            api_key: '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'
        }
      }
var mailer = nodemailer.createTransport(sgTransport(options));

/*GET admin home page */

router.get('/admin/home',function(req,res,next){

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/new_quiz',function(req,res,next){
  res.render('new_quiz',{title:' New Quiz'})
});

router.post('/submit_map',function(req,res,next){

  console.log(JSON.stringify(req.body,null,4));
  var map = new Map({
      title:req.body.title.title,
      location:req.body.title.location,
      price:req.body.title.price,
      createdBy:req.body.createdBy
  });

  map.save(function(err,map){
      if(err) return next(err);

      res.status('200').json({success:true});
  });

});

router.post('/all_maps',function(req,res,next){

   Map.find({},function(err,map){

     if(err)return next(err);
     res.json(map);

   }).sort('-createdAt');

});

router.param('map',function(req,res,next,id){
    var query = Map.findById(id);

    query.exec(function(err,map){
        if(err)return next(err);
        if(!map)return next(new Error("can't find map"));

        req.map = map;
        return next();
    });
});

router.get('/all_maps/:map',function(req,res,next){
    res.json(req.map);
});



router.post('/translate_test',function(req,res,next){

  var formData = {
        // Pass a simple key-value pair
        my_field: 'my_value',
        // Pass data via Buffers
        my_buffer: new Buffer([1, 2, 3]),
        // Pass data via Streams
        file: fs.createReadStream(__dirname + '/pdf/research.pdf'),
        // Pass multiple values /w an Array

        to : "fra",
    };

  request({
     uri: "https://lc-api.sdl.com/file-translations",
     formData:formData,
     method: "POST",
     timeout: 5000000,
     headers: {'content-type' : 'text/plain','Authorization': 'LC apiKey=c2CXBcMP4Z%2FwjRKvIkw9gg%3D%3D'},
     followRedirect: true,
  },

  function(error, response, body) {
        console.log('response : '+ response.statusCode);
        console.log('response : * ' + JSON.stringify(response,null,4) );
        //var body = response.body;
        //console.log("body = " + response.body  );
        var bodyJson = JSON.parse(body);


        console.log("body.id = " + bodyJson.id);

        res.json(bodyJson);
        //console.log("Going over to download.....");
 });


    console.log("Finished request ....");

});

router.post("/download_tfile",function(req,res,next){
      var fileId = req.body.fileId;
      console.log("translatedFileId *: " + fileId );

      request({
        uri: "https://lc-api.sdl.com/file-translations/"+fileId+"/translated-file ",
        method: "GET",
        timeout: 5000000,
        headers: {'content-type' : 'text/plain','Authorization': 'LC apiKey=c2CXBcMP4Z%2FwjRKvIkw9gg%3D%3D'},
        followRedirect: true,
      },function(error,response,body){

            //console.log("Started downloading....");
            //console.log("Err : " + JSON.stringify(error));
            //console.log('response: '+ response.statusCode);
            console.log("Got the file in the body : " + body);
            //console.log("Finished downloading...");

      }).pipe(fs.createWriteStream("test.pdf"));

});

router.post("/get_all_books",function(req,res,next){

    Book.find({},function(err,books){

        if(err)return next(err);

        return res.json(books);

    }).sort('-creatdAt');

});

router.post("/get_book",function(req,res,next){

    var bookId = req.body.bookId;

    var query = Book.findById(bookId);

    query.exec(function(err,book){

        if(err)return next(err);

        if(!book)return res.send("Book doesn't exist");

        return res.json(book);

    });

});

router.get('/all_quiz',function(req,res,next){

  Quiz.find({},function(err,quiz){
      if(err){console.log("error : " + err);return next(err);}

      console.log(quiz);
      res.json(quiz);

  }).sort('-createdAt');

});

router.param('quiz',function(req,res,next,id){

  var query = Quiz.findById(id);

  query.exec(function(err,qu){
      if(err){return next(err);}
      if(!qu){return next(new Error("can't find quiz"));}

      req.quiz = qu;
      return next();
  });

});

router.get("/all_quiz/:quiz",function(req,res){
    res.json(req.quiz);
});

router.post('/save_quiz',function(req,res,next){
   var quiz = req.body;
   var str = JSON.stringify(quiz, null, 4);
   console.log("quiz : " + str);

  console.log('quizPoster : ' + req.body.quizPoster);


   var quiz = new Quiz({
     quizName : req.body.quizName,
     numberOfQuestions : req.body.numberOfQuestions,
     quizCategory : req.body.quizCategory,
     country:req.body.country,
     state:req.body.state,
     foreignLanguage:req.body.foreignLanguage,
     quizPoster : req.body.quizPoster,
     mainQuiz:req.body.quiz,
     createdBy:req.body.createdBy
   });

   quiz.save(function(err,quiz){
     if(err){console.log("error");return next(err);}
     console.log("quiz err : " + quiz);
     res.json(quiz);
   });

});

router.post('/register',function(req,res,next){

  var user = new User();

  user.fullname = req.body.fullname;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  console.log("fullname : " + user.fullname + " | " + user.email );

  user.save(function(err){
      if(err)next(err);
      console.log("N err : " + err);

      return res.json({token: user.generateJWT()});
  });

   var mailOptions = {
        to:req.body.email,
        from:"no-reply@mhadiab.com",
        subject : "Welcome to mhadiab",
        text : "<b>This is where it all begins</b> ",
        html : "<b>This is where it all begins</b> "
      };


     mailer.sendMail(mailOptions,
      function(error, info){
        if(error){
            console.log("Sendgrid Err : " + error);
            res.status('401').json({err: info});
        }else{
            res.status('200').json({success: true});
        }
    });

});

router.post('/login',function(req,res,next){

  passport.authenticate('local',function(err,user,info){

    if(err)return next(err);

    if(user){
      return res.json({token:user.generateJWT()});
    }
    else{
      return res.status(401).json(info);
    }

  })(req,res,next);

});


router.post("/submit_contact",function(req,res,next){

  var name = req.contact.name;
  var email = req.contact.email;
  var subject = req.contact.subject;
  var message = req.contact.message;

  var mailOption = {
    from:"password-reset@mhadiab.com",
    to:"contact@mhadiab.com",  //admin email address
    subject:subject,
    text:message,
    html:message,
  }

  mailer.sendMail(mailOption,function(error,info){
      if(error)
      {
        console.log("Sendgrid Err submit_contact_form : " + error);
        res.status('401').json({err:info});
      }
      else
      {
         res.status('200').json({success:true});
      }
  });


});

router.post('/password-reset',function(req,res,next){

   var user_email = req.user.email;

   User.findOne({email:user_email},function(err,user){

      if(err)return next(err);

      var userHash = user.hash;
      var userName = user.fullname;
      var resetUrl = "mhadiab.scalingo.io/#/reset_password/"+userHash;

      var mailOptions = {
        from:"password-reset@mhadiab.com", // s
        to : user_email,
        subject : "Password reset link",
        text : "Password reset link : " + resetUrl,
        html : " <b>Hi  " + userName + "</b>,<br/><br/> <pYou recently requested for a password reset link : Click on the link below or copy it to a browser to reset your password"+
          "</p><br/><p>"+resetUrl+"</p><br/><p> If you didn't request for one, Ignore this email</p><br/><br/>Regards,<br/>Mhadiab Team",
      }

      mailer.sendMail(mailOptions,function(error,info){
          if(error){
             console.log("Sendgrid Err : " + error);
             res.status('401').json({error:info});
          }
          res.status('200').json({success:true})
      });

   });

});

router.get('/reset_password/:reset_hash',function(req,res,next){
    res.json(req.user);
});

router.param('/reset_hash',function(req,res,next,hash){

  User.findOne({hash:hash},function(err,user){
      if(err)return next(err);
      if(!user)return next(new Error("Invalid activation code"));

      req.user = user;
      return next();
  });

});

router.post('/auth/facebook',function(req,res,next){

    var fields = ['id','email','first_name','last_name','link','name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: 'fe71d33bdcd824f61cac65dd6e2e22e0',
        redirect_uri: req.body.redirectUri
    };

    request.get({url:accessTokenUrl, qs:params, json:true}, function(err,response,accessToken){

        if(response.statusCode != 200)
        {

          return res.status(500).send({message:"access token 500 :"+accessToken.error.message});
        }

        request.get({url:graphApiUrl, qs:accessToken,json:true},function(err,response,profile){
             console.log("prof : " + JSON.stringify(profile,null,4));
             console.log("epfb:"+profile.email);
             if(response.statusCode != 200)
             {
               return res.status(500).send({message:profile.error.message});
             }
            if(req.header('Authorization'))
            {
                    User.findOne({ email:profile.email },function(err,existingUser){
                        if(existingUser)
                        {

                          return res.status(409).send({message:"There is already a facebook account that belongs to you"});
                        }
                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token,'SECRET');

                        User.findById(payload._id,function(err,user){
                            console.log("user : " + user + " p_id:"+payload._id+" | pid:" + payload.id);
                            if(!user)
                            {
                              console.log("MFB : User not found! : " + payload.id);
                              return res.status(400).send({message:"User not found"});
                            }

                            user.email = profile.email;
                            user.fullname = profile.displayName || profile.name;
                            user.save(function(){
                                return res.json({token:user.generateJWT()});
                            });

                        });

                    });
                 }
                 else
                 {
                     User.findOne({email:profile.email},function(err,existingUser){

                          if(existingUser)
                          {
                            return res.json({token:existingUser.generateJWT()});
                          }
                          var user = new User();

                          user.email = profile.email;
                          user.fullname = profile.name;
                          user.save(function(){
                              return res.json({token:user.generateJWT()})
                          })

                     });
                 }
            });
    });


});

router.post('/auth/google', function(req, res,next) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: 'KMzQpgr99sLC91wuzv3f-9r0',
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      console.log("ggm : " + JSON.stringify(profile,null,4));
      if (profile.error) {
        return res.status(500).send({message: profile.error.message});
      }
      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({ email: profile._id }, function(err, existingUser) {
          if (existingUser) {
            console.log("MFB : There is already a google account that belongs to you");
            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload._id, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.email = profile.email;
            user.fullname = user.displayName || profile.name;
            user.save(function() {
                return res.json({token:user.generateJWT()});
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
                User.findOne({ email: profile.email }, function(err, existingUser) {
                  if (existingUser) {
                    return res.json({ token: existingUser.generateJWT() });
                  }
                  var user = new User();
                  user.email = profile.email;
                  user.fullname = profile.name;
                  user.save(function(err) {
                      return res.json({token:user.generateJWT()});
                  });
                });
      }
    });
  });
});

router.post("/add_car",function(req,res,next){

  var car = new Car({
      name:req.body.car.name,
      year:req.body.car.year,
      price:req.body.car.price,
      description:req.body.car.description,
      features:req.body.car.features,
      images:req.body.car.images,
      video:req.body.car.video,
      email:req.body.car.email,
      phone:req.body.car.phone,
      skype:req.body.car.skype,
      createdBy:req.body.createdBy
  });

  car.save(function(err,car){
      if(err){return next(err);}

      return res.status('200').json({success:true});
  });

});

router.post("/view_all_cars",function(req,res,next){

   Car.find({},function(err,car){
     if(err) return next(err);

     return res.json(car);
   });

});

router.param("car",function(req,res,next,id){

  var query = Car.findById(id);

  query.exec(function(err,cr){
        if(err){return next(err);}

        if(!cr){return next(new Error("Can't find car with this id"));}

        req.car = cr;
        return next();
  });

});

router.get("/view_car/:car",function(req,res){
    res.json(req.car);
});

router.post("/add_tutor",function(req,res,next){

  if(req.body.tutor.image == "" || req.body.tutor.image == null)
  {
    req.body.tutor.image = "images/profile.jpg"
  }

  var tutor = new Tutor({
     firstname:req.body.tutor.firstname,
     lastname:req.body.tutor.lastname,
     email:req.body.tutor.email,
     skype:req.body.tutor.skype,
     image:req.body.tutor.image,
     shortIntro:req.body.tutor.shortIntro,
     about:req.body.tutor.about,
     languages:req.body.tutor.languages,
     categories:req.body.tutor.categories,
     createdBy:req.body.createdBy
  });

  tutor.save(function(err,tut){

    if(err)return next(err);

    return res.status('200').json({success:true});
  });

});

router.get("/all_tutors",function(req,res,next){

   Tutor.find({},function(err,tutor){

      if(err)return next(err);

      return res.json(tutor);

   });

});

router.param("tutor",function(req,res,next,id){

    var query = Tutor.findById(id);

    query.exec(function(err,tutor){

        if(err)return next(err);

        if(!tutor)return next(new Error("Tutor with this id not found"));

        req.tutor = tutor;
        return next();
    });

});

router.get("/view_tutor/:tutor",function(req,res,next){

      res.json(req.tutor);

});

router.post("/add_teenager",function(req,res,next){

  if(req.body.teenager.image == "" || req.body.teenager.image == null)
  {
    req.body.teenager.image = "images/profile.jpg"
  }

  var teenager = new Teenager({
     firstname:req.body.teenager.firstname,
     lastname:req.body.teenager.lastname,
     email:req.body.teenager.email,
     skype:req.body.teenager.skype,
     image:req.body.teenager.image,
     shortIntro:req.body.teenager.shortIntro,
     about:req.body.teenager.about,
     languages:req.body.teenager.languages,
     categories:req.body.teenager.categories,
     createdBy:req.body.createdBy
  });

  teenager.save(function(err,tut){

    if(err)return next(err);

    return res.status('200').json({success:true});
  });

});

router.get("/all_teenagers",function(req,res,next){

   Teenager.find({},function(err,teenager){

      if(err)return next(err);

      return res.json(teenager);

   });

});

router.param("teenager",function(req,res,next,id){

    var query = Teenager.findById(id);

    query.exec(function(err,teenager){

        if(err)return next(err);

        if(!teenager)return next(new Error("Teenager with this id not found"));

        req.teenager = teenager;
        return next();
    });

});

router.get("/view_teenager/:teenager",function(req,res,next){

      res.json(req.teenager);

});

router.post("/add_designer",function(req,res,next){

  if(req.body.designer.image == "" || req.body.designer.image == null)
  {
    req.body.designer.image = "images/profile.jpg"
  }
    var designer = new Infographer({
       image:req.body.designer.image,
       firstName:req.body.designer.firstname,
       lastName:req.body.designer.lastname,
       emailAddress:req.body.designer.email,
       skypeId:req.body.designer.skypeId,
       shortIntro:req.body.designer.shortIntro,
       description:req.body.designer.about,
       portfolio:req.body.designer.portfolio,
       categories:req.body.designer.categories,
       createdBy:req.body.createdBy
    });

    designer.save(function(err,desginer){

        if(err)return next(err);

        return res.status('200').json({success:true});

    });

});

router.post("/view_all_designers",function(req,res,next){

    Infographer.find({},function(err,infographer){

        if(err) return next(err);
        console.log(err);
        return res.json(infographer);
        console.log("Infographer : " + infographer);
    });

});

router.param("designer",function(req,res,next,id){

  var query = Infographer.findById(id);

  query.exec(function(err,designer){

      if(err) return next(err);

      if(!designer) return next(new Error("Designer with this id not found"));

      req.designer = designer;

      return next();
  });

});

router.get("/view_designer/:designer",function(req,res,next){
    res.json(req.designer);
});

router.post("/add_biz",function(req,res,next){

    if(req.body.biz.logo == "" || req.body.biz.logo == null)
    {
      req.body.biz.logo = "images/logo.jpg"
    }

  var biz = new Biz({
     name:req.body.biz.name,
     tagline:req.body.biz.tagline,
     description:req.body.biz.description,
     category:req.body.biz.category,
     address:req.body.biz.address,
     openHours:req.body.biz.openHours,
     website:req.body.biz.website,
     email:req.body.biz.email,
     facebook:req.body.biz.facebook,
     twitter:req.body.biz.twitter,
     logo:req.body.biz.logo
  });

  biz.save(function(err,biz){

      if(err)return next(err);

      return res.status('200').json({success:true});

  });

});

router.get("/view_all_biz",function(req,res,next){

    Biz.find({},function(err,biz){
        if(err)return next(err);

        return res.json(biz);
    });

});

router.param("biz",function(req,res,next,id){

     var query = Biz.findById(id);

     query.exec(function(err,biz){

        if(err)return next(err);

        if(!biz)return next(new Error("Biz with this id doesn't exist"));

        req.biz = biz;

        return next();
     });

});

router.get("/view_biz/:biz",function(req,res,next){
        res.json(req.biz);
});

router.post("submit_biz_comment",function(req,res,next){

  var bizcomment = new BizComment({
      commentText : req.body.text,
      bizId : req.body.bizId,
      createdBy:req.body.createdBy
  });

  bizcomment.save(function(err,bizcomment){
      if(err)return next(err);
      return res.status('200').json({success:true});
  });

});

router.param("bizcomment",function(req,res,next,id){

     var query = BizComment.find({bizId:id},function(err,bizcomment){

        if(err)return next(err);

        if(!bizcomment)return next(new Error("This biz has 0 comments"));

        req.bizcomment = bizcomment;

        return next();

     });

});

router.get("/all_comment/:bizcomment",function(req,res,next){

    res.json(req.bizcomment);

});

router.post("update_biz_rating",function(req,res,next){

    var bizId = req.body.biz.id;
    var rating = req.body.biz.rating;

    var query = Biz.findById(bizId);

    query.exec(function(err,biz){

        if(err) return "Biz not found";

        if(firm)
        {
          Biz.updateRating(rating);
        }

    });

});


router.post("/add_lawfirm",function(req,res,next){

  console.log(JSON.stringify(req.body.firm,null,4));

  if(req.body.firm.logo == "" || req.body.firm.logo == null)
  {
    req.body.firm.logo = "images/logo.jpg"
  }

  var lawyer = new Lawyer({
     name:req.body.firm.name,
     tagline:req.body.firm.tagline,
     description:req.body.firm.description,
     category:req.body.firm.category,
     address:req.body.firm.address,
     openHours:req.body.firm.openHours,
     website:req.body.firm.website,
     email:req.body.firm.email,
     facebook:req.body.firm.facebook,
     twitter:req.body.firm.twitter,
     logo:req.body.firm.logo
  });

  lawyer.save(function(err,biz){

      if(err)return next(err);

      return res.status('200').json({success:true});

  })

});

router.get("/view_all_lawfirm",function(req,res,next){

     Lawyer.find({},function(err,biz){
        if(err)return next(err);

        return res.json(biz);
    });

});

router.param("lawfirm",function(req,res,next,id){

     var query = Lawyer.findById(id);

     query.exec(function(err,lawfirm){

        if(err)return next(err);

        if(!lawfirm)return next(new Error("Law firm with this id doesn't exist"));

        req.lawfirm = lawfirm;

        return next();
     });

});

router.get("/view_lawfirm/:lawfirm",function(req,res,next){
        res.json(req.lawfirm);
});

router.post("submit_firm_comment",function(req,res,next){

  var firmcomment = new FirmComment({
      commentText : req.body.comment.text,
      createdBy : req.body.createdBy,
      firmId : req.body.comment.firmId
  });

  firmcomment.save(function(err,firmcomment){
      if(err)return next(err);

      return res.status('200').json({success:true});
  });

});

router.post("update_firm_rating",function(req,res,next){

    var firmId = req.body.firm.id;
    var rating = req.body.firm.rating;

    var query = Lawyer.findById(firmId);

    query.exec(function(err,firm){

        if(err) return "Firm not found";

        if(firm)
        {
          Lawyer.updateRating(rating);
        }

    });

});

router.param("inbox",function(req,res,next,userId){

  //var query = Inbox.find

});

router.get("get_user_inbox/:inbox",function(req,res,next){

  //req.inbox

});

router.get("user_inbox_messages",function(req,res,next){

});

router.post("/view_iteens",function(req,res,next){
    var userId = req.body.uId;

    Teenager.find({createdBy:userId},function(err,teen){

      if(err) return next(err);
      else{
        return res.json(teen);
      }

    });

});


router.post("/view_idesigner",function(req,res,next){

  var userId = req.body.uId;
  Infographer.find({createdBy:userId},function(err,designer){
      if(err)return next(err);
      else{
        return res.json(designer);
      }
  });

});

router.post("/view_itutor",function(req,res,next){

    var userId = req.body.uId;
    Tutor.find({createdBy:userId},function(err,tutor){
          if(err)return next(err);
          else{
            console.log("tutor : " + tutor);
            return res.json(tutor);
          }
      });

});


router.post("/view_icar",function(req,res,next){

  var userId = req.body.uId;
  Car.find({createdBy:userId},function(err,car){
      if(err)return next(err);
      else{
        return res.json(car);
      }
  });

});


var paypal = require('paypal-rest-sdk');
var paypal_config = {
    "host" : "api.sandbox.paypal.com",
    "port" : "",
    'client_id': 'ARLCssPTbHSfD--unv8QrrzApA_0bWp8WPbNxDAdV5OG5VyY8fLusOi2-Mt-7AhbWjrVFDOTXafjQuGS', //ARLCssPTbHSfD--unv8QrrzApA_0bWp8WPbNxDAdV5OG5VyY8fLusOi2-Mt-7AhbWjrVFDOTXafjQuGS
    'client_secret': 'EFrDiTimOBWnbBxh2CcHSaFyBtP8UDvV4E8zYsk6eRlI2AR5ChW3h9FEz0ot-XmvDGPq_KCjfa-XLA8M' //EFrDiTimOBWnbBxh2CcHSaFyBtP8UDvV4E8zYsk6eRlI2AR5ChW3h9FEz0ot-XmvDGPq_KCjfa-XLA8M
}
router.post("/process_tutor_card",function(req,res,next){
   console.log("in process_tutor_card starting...");
   console.log(JSON.stringify(req.body.card,null,4));

   var type = req.body.type;
   var productId = req.body.productId;
   var createdBy = req.body.createdBy;

    var card_data = {
      "number": req.body.card.card_number,
      "type": "mastercard",
      "expire_month": Number(req.body.card.card_month),//12
      "expire_year": Number(req.body.card.card_year),//2018
      "cvv2": Number(req.body.card.card_cvv),
      "first_name": req.body.card.firstname,
      "last_name": req.body.card.lastname
    };

    var amount_data = {
      "total":req.body.card.amount,
      "currency":"USD"
    }

    var payment_json = {
      "intent":"sale",
      "payer":{
        "payment_method":"credit_card",
        "funding_instruments":[{
          "credit_card":card_data
        }]
      },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("Sent payment is : " + JSON.stringify(payment_json,null,4));
    paypal.payment.create(payment_json,paypal_config,function(error,payment)
    {
          console.log("function payment is : " + payment);
          if(error)
          {
            console.log("I don't know what this is : " + error);
            return next(error);
          }
          else
          {
            console.log("payment response : " + JSON.stringify(payment,null,4));
            var payment_info = new Payment({
                createdBy : createdBy,
                productId : productId,
                productType : productType,
                transactionDetails : payment
            });
            payment_info.save(function(err,payment){
                if(err)return next(err);
                return res.status('200').json({success:true});
            });



          }
    });

});

router.post("/process_designer_card",function(req,res,next){
   console.log("in process_designer_card starting...");
   console.log(JSON.stringify(req.body.card,null,4));

   var type = req.body.type;
   var productId = req.body.productId;
   var createdBy = req.body.createdBy;

    var card_data = {
      "number": req.body.card.card_number,
      "type": "mastercard",
      "expire_month": Number(req.body.card.card_month),//12
      "expire_year": Number(req.body.card.card_year),//2018
      "cvv2": Number(req.body.card.card_cvv),
      "first_name": req.body.card.firstname,
      "last_name": req.body.card.lastname
    };

    var amount_data = {
      "total":req.body.card.amount,
      "currency":"USD"
    }

    var payment_json = {
      "intent":"sale",
      "payer":{
        "payment_method":"credit_card",
        "funding_instruments":[{
          "credit_card":card_data
        }]
      },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("Sent payment is : " + JSON.stringify(payment_json,null,4));
    paypal.payment.create(payment_json,paypal_config,function(error,payment)
    {
          console.log("function payment is : " + payment);
          if(error)
          {
            console.log("I don't know what this is : " + error);
            return next(error);
          }
          else
          {
            console.log("payment response : " + JSON.stringify(payment,null,4));
            var payment_info = new Payment({
                createdBy : createdBy,
                productId : productId,
                productType : productType,
                transactionDetails : payment
            });
            payment_info.save(function(err,payment){
                if(err)return next(err);
                return res.status('200').json({success:true});
            });


          }
    });

});

router.post("/process_map_card",function(req,res,next){
   console.log("in process_designer_card starting...");
   console.log(JSON.stringify(req.body.card,null,4));

   var type = req.body.type;
   var productId = req.body.productId;
   var createdBy = req.body.createdBy;

    var card_data = {
      "number": req.body.card.card_number,
      "type": "mastercard",
      "expire_month": Number(req.body.card.card_month),//12
      "expire_year": Number(req.body.card.card_year),//2018
      "cvv2": Number(req.body.card.card_cvv),
      "first_name": req.body.card.firstname,
      "last_name": req.body.card.lastname
    };

    var amount_data = {
      "total":req.body.card.amount,
      "currency":"USD"
    }

    var payment_json = {
      "intent":"sale",
      "payer":{
        "payment_method":"credit_card",
        "funding_instruments":[{
          "credit_card":card_data
        }]
      },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("Sent payment is : " + JSON.stringify(payment_json,null,4));
    paypal.payment.create(payment_json,paypal_config,function(error,payment)
    {
          console.log("function payment is : " + payment);
          if(error)
          {
            console.log("I don't know what this is : " + error);
            return next(error);
          }
          else
          {
            console.log("payment response : " + JSON.stringify(payment,null,4));
            var payment_info = new Payment({
                createdBy : createdBy,
                productId : productId,
                productType : productType,
                transactionDetails : payment
            });
            payment_info.save(function(err,payment){
                if(err)return next(err);
                return res.status('200').json({success:true});
            });


          }
    });

});

router.post("/process_quiz_card",function(req,res,next){
   console.log("in process_quiz_card starting...");
   console.log(JSON.stringify(req.body.card,null,4));

   var type = req.body.type;
   var productId = req.body.productId;
   var createdBy = req.body.createdBy;

    var card_data = {
      "number": req.body.card.card_number,
      "type": "mastercard",
      "expire_month": Number(req.body.card.card_month),//12
      "expire_year": Number(req.body.card.card_year),//2018
      "cvv2": Number(req.body.card.card_cvv),
      "first_name": req.body.card.firstname,
      "last_name": req.body.card.lastname
    };

    var amount_data = {
      "total":req.body.card.amount,
      "currency":"USD"
    }

    var payment_json = {
      "intent":"sale",
      "payer":{
        "payment_method":"credit_card",
        "funding_instruments":[{
          "credit_card":card_data
        }]
      },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("Sent payment is : " + JSON.stringify(payment_json,null,4));
    paypal.payment.create(payment_json,paypal_config,function(error,payment)
    {
          console.log("function payment is : " + payment);
          if(error)
          {
            console.log("I don't know what this is : " + error);
            return next(error);
          }
          else
          {
            console.log("payment response : " + JSON.stringify(payment,null,4));
            var payment_info = new Payment({
                createdBy : createdBy,
                productId : productId,
                productType : productType,
                transactionDetails : payment
            });
            payment_info.save(function(err,payment){
                if(err)return next(err);
                return res.status('200').json({success:true});
            });


          }
    });

});

router.post("/process_book_card",function(req,res,next){
   console.log("in process_book_card starting...");
   console.log(JSON.stringify(req.body.card,null,4));

   var type = req.body.type;
   var productId = req.body.productId;
   var createdBy = req.body.createdBy;

    var card_data = {
      "number": req.body.card.card_number,
      "type": "mastercard",
      "expire_month": Number(req.body.card.card_month),//12
      "expire_year": Number(req.body.card.card_year),//2018
      "cvv2": Number(req.body.card.card_cvv),
      "first_name": req.body.card.firstname,
      "last_name": req.body.card.lastname
    };

    var amount_data = {
      "total":req.body.card.amount,
      "currency":"USD"
    }

    var payment_json = {
      "intent":"sale",
      "payer":{
        "payment_method":"credit_card",
        "funding_instruments":[{
          "credit_card":card_data
        }]
      },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("Sent payment is : " + JSON.stringify(payment_json,null,4));
    paypal.payment.create(payment_json,paypal_config,function(error,payment)
    {
          console.log("function payment is : " + payment);
          if(error)
          {
            console.log("I don't know what this is : " + error);
            return next(error);
          }
          else
          {
            console.log("payment response : " + JSON.stringify(payment,null,4));
            var payment_info = new Payment({
                createdBy : createdBy,
                productId : productId,
                productType : productType,
                transactionDetails : payment
            });
            payment_info.save(function(err,payment){
                if(err)return next(err);
                return res.status('200').json({success:true});
            });


          }
    });

});

router.post("/process_car_card",function(req,res,next){
   console.log("in process_book_card starting...");
   console.log(JSON.stringify(req.body.card,null,4));

   var type = req.body.type;
   var productId = req.body.productId;
   var createdBy = req.body.createdBy;

    var card_data = {
      "number": req.body.card.card_number,
      "type": "mastercard",
      "expire_month": Number(req.body.card.card_month),//12
      "expire_year": Number(req.body.card.card_year),//2018
      "cvv2": Number(req.body.card.card_cvv),
      "first_name": req.body.card.firstname,
      "last_name": req.body.card.lastname
    };

    var amount_data = {
      "total":req.body.card.amount,
      "currency":"USD"
    }

    var payment_json = {
      "intent":"sale",
      "payer":{
        "payment_method":"credit_card",
        "funding_instruments":[{
          "credit_card":card_data
        }]
      },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("Sent payment is : " + JSON.stringify(payment_json,null,4));
    paypal.payment.create(payment_json,paypal_config,function(error,payment)
    {
          console.log("function payment is : " + payment);
          if(error)
          {
            console.log("I don't know what this is : " + error);
            return next(error);
          }
          else
          {
            console.log("payment response : " + JSON.stringify(payment,null,4));
            var payment_info = new Payment({
                createdBy : createdBy,
                productId : productId,
                productType : productType,
                transactionDetails : payment
            });
            payment_info.save(function(err,payment){
                if(err)return next(err);
                return res.status('200').json({success:true});
            });


          }
    });

});

router.post("/process_tutor_paypal",function(req,res,next){

    var createdBy = req.body.createdBy;
    var type = req.body.type;
    var productId = req.body.productId;

    req.session.createdBy = createdBy;
    req.session.productType = type;
    req.session.productId = productId;

    var amount_data = {
      "total":"100",
      "currency":"USD"
    }

    var payment = {
      "intent":"sale",
      "payer":
       {
        "payment_method":"paypal"
       },
       "redirect_urls":{
          "return_url":"http://mhadi85.scalingo.io/execute_card",
          "cancel_url":"http://mhadi85.scalingo.io/cancel_card"
       },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("payment json b4 : " + JSON.stringify(payment,null,4));

    paypal.payment.create(payment,paypal_config,function(error,payment)
    {
          console.log("payment json returned : " + JSON.stringify(payment,null,4));
          if(error){
            console.log("error : " + error);
            return next(error);
          }
          else{
                 console.log("payment.id : " + payment.id);
                 req.session.paymentId = payment.id;
                 var redirectUrl;

                 for(var i=0; i < payment.links.length; i++)
                 {
                   var link = payment.links[i];
                   if (link.method === 'REDIRECT')
                   {
                     redirectUrl = link.href;
                     console.log("redirectUrl : " + redirectUrl);
                   }
                 }
                 console.log("redirecting now to : " + redirectUrl);
                 return res.send(redirectUrl);

          }
    });

});

router.post("/process_designer_paypal",function(req,res,next){

  var createdBy = req.body.createdBy;
  var type = req.body.type;
  var productId = req.body.productId;

  req.session.createdBy = createdBy;
  req.session.productType = type;
  req.session.productId = productId;

    var amount_data = {
      "total":"100",
      "currency":"USD"
    }

    var payment = {
      "intent":"sale",
      "payer":
       {
        "payment_method":"paypal"
       },
       "redirect_urls":{
          "return_url":"http://mhadiab.scalingo.io/execute_card",
          "cancel_url":"http://mhadiab.scaling.io/cancel_card"
       },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    paypal.payment.create(payment,paypal_config,function(error,payment)
    {
          console.log("payment json returned : " + JSON.stringify(payment,null,4));
          if(error){
            console.log("error : " + error);
            return next(error);
          }
          else{
                 console.log("payment.id : " + payment.id);
                 req.session.paymentId = payment.id;
                 var redirectUrl;

                 for(var i=0; i < payment.links.length; i++)
                 {
                   var link = payment.links[i];
                   if (link.method === 'REDIRECT')
                   {
                     redirectUrl = link.href;
                     console.log("redirectUrl : " + redirectUrl);
                   }
                 }
                 console.log("redirecting now to : " + redirectUrl);
                 return res.send(redirectUrl);

          }
    });

});

router.post("/process_map_paypal",function(req,res,next){

  var createdBy = req.body.createdBy;
  var type = req.body.type;
  var productId = req.body.productId;

  req.session.createdBy = createdBy;
  req.session.productType = type;
  req.session.productId = productId;

    var amount_data = {
      "total":"100",
      "currency":"USD"
    }

    var payment = {
      "intent":"sale",
      "payer":
       {
        "payment_method":"paypal"
       },
       "redirect_urls":{
          "return_url":"http://mhadiab.scalingo.io/execute_card",
          "cancel_url":"http://mhadiab.scaling.io/cancel_card"
       },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("payment json b4 : " + JSON.stringify(payment,null,4));

    paypal.payment.create(payment,paypal_config,function(error,payment)
    {
          console.log("payment json returned : " + JSON.stringify(payment,null,4));
          if(error){
            console.log("error : " + error);
            return next(error);
          }
          else{
                 console.log("payment.id : " + payment.id);
                 req.session.paymentId = payment.id;
                 var redirectUrl;

                 for(var i=0; i < payment.links.length; i++)
                 {
                   var link = payment.links[i];
                   if (link.method === 'REDIRECT')
                   {
                     redirectUrl = link.href;
                     console.log("redirectUrl : " + redirectUrl);
                   }
                 }
                 console.log("redirecting now to : " + redirectUrl);
                 return res.send(redirectUrl);

          }
    });

});

router.post("/process_quiz_paypal",function(req,res,next){

  var createdBy = req.body.createdBy;
  var type = req.body.type;
  var productId = req.body.productId;

  req.session.createdBy = createdBy;
  req.session.productType = type;
  req.session.productId = productId;

    var amount_data = {
      "total":"100",
      "currency":"USD"
    }

    var payment = {
      "intent":"sale",
      "payer":
       {
        "payment_method":"paypal"
       },
       "redirect_urls":{
          "return_url":"http://mhadiab.scalingo.io/execute_card",
          "cancel_url":"http://mhadiab.scaling.io/cancel_card"
       },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    paypal.payment.create(payment,paypal_config,function(error,payment)
    {
          console.log("payment json returned : " + JSON.stringify(payment,null,4));
          if(error){
            console.log("error : " + error);
            return next(error);
          }
          else{
                 console.log("payment.id : " + payment.id);
                 req.session.paymentId = payment.id;
                 var redirectUrl;

                 for(var i=0; i < payment.links.length; i++)
                 {
                   var link = payment.links[i];
                   if (link.method === 'REDIRECT')
                   {
                     redirectUrl = link.href;
                     console.log("redirectUrl : " + redirectUrl);
                   }
                 }
                 console.log("redirecting now to : " + redirectUrl);
                 return res.send(redirectUrl);

          }
    });

});

router.post("/process_car_paypal",function(req,res,next){

  var createdBy = req.body.createdBy;
  var type = req.body.type;
  var productId = req.body.productId;

  req.session.createdBy = createdBy;
  req.session.productType = type;
  req.session.productId = productId;

    var amount_data = {
      "total":"100",
      "currency":"USD"
    }

    var payment = {
      "intent":"sale",
      "payer":
       {
        "payment_method":"paypal"
       },
       "redirect_urls":{
          "return_url":"http://mhadiab.scalingo.io/execute_card",
          "cancel_url":"http://mhadiab.scaling.io/cancel_card"
       },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    console.log("payment json b4 : " + JSON.stringify(payment,null,4));

    paypal.payment.create(payment,paypal_config,function(error,payment)
    {
          console.log("payment json returned : " + JSON.stringify(payment,null,4));
          if(error){
            console.log("error : " + error);
            return next(error);
          }
          else{
                 console.log("payment.id : " + payment.id);
                 req.session.paymentId = payment.id;
                 var redirectUrl;

                 for(var i=0; i < payment.links.length; i++)
                 {
                   var link = payment.links[i];
                   if (link.method === 'REDIRECT')
                   {
                     redirectUrl = link.href;
                     console.log("redirectUrl : " + redirectUrl);
                   }
                 }
                 console.log("redirecting now to : " + redirectUrl);
                 return res.send(redirectUrl);

          }
    });

});

router.post("/process_book_paypal",function(req,res,next){

  var createdBy = req.body.createdBy;
  var type = req.body.type;
  var productId = req.body.productId;

  req.session.createdBy = createdBy;
  req.session.productType = type;
  req.session.productId = productId;

    var amount_data = {
      "total":"100",
      "currency":"USD"
    }

    var payment = {
      "intent":"sale",
      "payer":
       {
        "payment_method":"paypal"
       },
       "redirect_urls":{
          "return_url":"http://mhadiab.scalingo.io/execute_card",
          "cancel_url":"http://mhadiab.scaling.io/cancel_card"
       },
      "transactions":[{
        "amount":amount_data,
        "description":"a test payment"
      }]
    }

    paypal.payment.create(payment,paypal_config,function(error,payment)
    {
          console.log("payment json returned : " + JSON.stringify(payment,null,4));
          if(error){
            console.log("error : " + error);
            return next(error);
          }
          else{
                 console.log("payment.id : " + payment.id);
                 req.session.paymentId = payment.id;
                 var redirectUrl;

                 for(var i=0; i < payment.links.length; i++)
                 {
                   var link = payment.links[i];
                   if (link.method === 'REDIRECT')
                   {
                     redirectUrl = link.href;
                     console.log("redirectUrl : " + redirectUrl);
                   }
                 }
                 console.log("redirecting now to : " + redirectUrl);
                 return res.send(redirectUrl);

          }
    });

});

router.get("/execute_card",function(req,res,next){

    console.log(req.session.productId + " | " + req.session.productType + " | " + req.session.createdBy);

    var paymentId = req.session.paymentId;
    var payerId = req.param("PayerID");
    console.log("payerId : " + payerId);

    var details = {"payer_id":payerId};
    paypal.payment.execute(paymentId,details,paypal_config,function(error,payment){
      console.log("exec payment : " + JSON.stringify(payment,null,4));
      if(error){
        //return res.send("error : " + error);
        return next(error);
      }
      else{

        //console.log("completed execution paypal *aaa");
        //res.status('200').json({success:true});
        var payment_info = new Payment({
            createdBy : req.session.createdBy,
            productId : req.session.productId,
            productType : req.session.productType,
            transactionDetails : payment
        });
        payment_info.save(function(err,payment){
            if(err)return next(err);
            //return res.status('200').json({success:true});
            return res.send("exec payment : " + JSON.stringify(payment,null,4));
        });
      }

    });

    //return res.send("in execute_card : " + paymentId + " | " + payerId);
});

router.get("/cancel_card",function(req,res,next){
    return res.send("The payment got cancelled");
});

router.post("/verify_payment_and_access",function(req,res,next){
    var userId = req.body.userId;
    var pId = req.body.pId;
    var type = req.body.type;

    Payment.find({createdBy:userId,productId:pId,productType:type},function(err,paym){

        if(err)return next(err);

        if(!paym)return next(new Error("You don't have access to view this page"));

        return res.status('200').json({success:true,access:"valid"});

    });

});

router.post("/send_inbox_message",function(req,res,next){

  var message = req.body.message;
  var server = req.body.server;
  var client = req.body.client;
  var type = req.body.type;

  var message = new Inbox({

    message : message,
    messageSender : server,
    messageRecipient : client,
    messageType : type

  });

  message.save(function(err,msg){
      if(err)return next(err);
      return res.status('200').json({success:true});
  });

});

router.post("/get_all_inbox_info",function(req,res,next){

  var userA = req.body.userA;
  var userB = req.body.userB;

  

});

module.exports = router;
