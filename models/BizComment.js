var mongoose = require("mongoose");

var BizCommentSchema = mongoose.Schema({

    commentText:String,
    commenterId:String,
    bizId:String,
    createdAt:{type:Date,default:Date.now}

});

BizCommentSchema.methods.getUser = function(userId){

  var query = User.findById(userId);

  query.exec(function(err,user){

      if(err)return "User not found";

      return user;

  })

}

BizCommentSchema.methods.getBiz = function(bizId){

  var query = Biz.findById(bizId);

  query.exec(function(err,biz){

      if(err)return "Biz not found";

      return biz;

  })

}

BizCommentSchema.pre("save",function(next){

  now = new Date();

  if(!this.createdAt)
  {
    this.createdAt = now;
  }

  next();

});

mongoose.model("BizComment",BizCommentSchema);
