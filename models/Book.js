var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({

  title:String,
  country:String,
  state:String,
  language:String,
  category:String,
  bookUrl:String,
  price : {type:Number,default:0},
  createdAt : {type:Date,default:Date.now},
  createdBy:String,

});

BookSchema.pre("save",function(next){

  now = new Date();
  if(!this.createdAt){
     this.createdAt = now;
   }

   next();

});

mongoose.model("Book",BookSchema);
