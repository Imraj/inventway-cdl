var mongoose = require('mongoose');

var TeenagerSchema = mongoose.Schema({

  firstname:String,
  lastname:String,
  email:String,
  skype:String,
  image:{type:String,default:"images/profile.jpg"},
  shortIntro:String,
  about:String,
  languages:[],
  categories:[],
  createdAt:{type:Date,default:Date.now},
  createdBy:String

});

TeenagerSchema.pre("save",function(next){

	now = new Date();
	if(!this.createdAt){
		this.createdAt = now;
	}
	next();

});

mongoose.model("Teenager",TeenagerSchema);
