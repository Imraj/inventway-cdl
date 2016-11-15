var mongoose = require("mongoose");
var User = mongoose.model("User");

var VContactSchema = mongoose.Schema({

  contact : String,
  contactedBy : String,
  contactType : String, //which of the service infograph, tutor, teenager is the contact for ?
  numberOfMessage : {type:Number,default:0},
  createdAt : {type:Date,default:Date.now}

});

VContactSchema.methods.getUserById = function(userId)
{
   var query = User.findById(userId);

   query.exec(function(err,user){

      if(err)return "VContact getUserById error";

      return user;

   });
}

VContactSchema.methods.incrementNumberOfMessages = function(){
    this.numberOfMessage ++;
}

VContactSchema.pre("save",function(next){

  now = new Date();

  if(!this.createdAt)
  {
    this.createdAt = now;
  }
  next();

});

mongoose.model("VContact",VContactSchema);
