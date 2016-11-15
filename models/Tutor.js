var mongoose = require('mongoose');

var TutorSchema = mongoose.Schema({

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

TutorSchema.pre("save",function(next){

	now = new Date();
	if(!this.createdAt){
		this.createdAt = now;
	}
	next();

});

mongoose.model("Tutor",TutorSchema);
