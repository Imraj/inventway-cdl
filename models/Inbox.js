var mongoose = require('mongoose');
var User = mongoose.model("User");

var InboxSchema = mongoose.Schema({

  messageSender : String,
  messageRecipient : String,
  createdAt : {type:Date,default:Date.now},
  message : String,
  messageType : String,
  attachment:{type:String,default:""}

});

InboxSchema.methods.getUserById = function(userId){

  var query = User.findById(userId);

  query.exec(function(err,user){

      if(err) return "Error in InboxSchema getUserById ";

      return user;

  });

}

InboxSchema.pre("save",function(next){

  now = new Date();
  if(!this.createdAt)
  {
    this.createdAt = now;
  }
  next();
});

mongoose.model("Inbox",InboxSchema);
