var mongoose = require('mongoose');

var InfographerSchema = mongoose.Schema({

  image:{type:String,default:"images/profile.jpg"},
  firstName:String,
  lastName:String,
  emailAddress:String,
  skypeId:String,
  shortIntro:String,
  description:String,
  portfolio:[],
  categories:[],
  createdBy:String

});

mongoose.model("Infographer",InfographerSchema);
