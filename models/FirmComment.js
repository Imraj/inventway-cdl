var mongoose = require("mongoose");
var User = mongoose.model("User");
var Laywer = mongoose.model("Lawyer");

var FirmCommentSchema = mongoose.Schema({

    commentText:String,
    commenterId:String,
    firmId:String,
    createdAt:{type:Date,default:Date.now},
    createdBy:String

});

FirmCommentSchema.methods.getUser = function(userId){

  var query = User.findById(userId);

  query.exec(function(err,user){

      if(err)return "User not found";

      return user;

  })

}

FirmCommentSchema.methods.getFirm = function(firmId){

  var query = Lawyer.findById(firmId);

  query.exec(function(err,firm){

      if(err)return "Firm not found";

      return firm;

  })

}

FirmCommentSchema.pre("save",function(next){

  now = new Date();

  if(!this.createdAt)
  {
    this.createdAt = now;
  }

  next();

});

mongoose.model("FirmComment",FirmCommentSchema);
