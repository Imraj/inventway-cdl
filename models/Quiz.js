var mongoose = require("mongoose");

var QuizSchema = new mongoose.Schema({

  quizName : String,
  numberOfQuestions:{type:Number},
  quizCategory : {type:String},
  country : String,
  state : String,
  foreignLanguage : String,
  quizPoster : {type:String,default:"images/img_1.jpg"},
  createdAt : {type:Date,default:Date.now},
  createdBy:String,
  price:{type:Number,default:0},
  mainQuiz : [{}]

});

QuizSchema.pre("save",function(next){

  now = new Date();
  if(!this.createdAt){
      this.createdAt = now;
  }
  next();

});

module.exports = mongoose.model("Quiz",QuizSchema);
