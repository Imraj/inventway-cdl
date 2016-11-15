var mongoose = require("mongoose");
var User = mongoose.model("User");

var UContactSchema = mongoose.Schema({

  from: String,
  to : String,
  messages:[]

});


mongoose.model("UContact",UContactSchema);
