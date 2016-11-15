var mongoose = require('mongoose');

var BizSchema = mongoose.Schema({

  name:String,
  tagline:String,
  description:String,
  category:String,
  address:String,
  openHours:String,
  logo:{type:String,default:"images/logo.jpg"},
  website:String,
  email:String,
  facebook:String,
  twitter:String,
  createdAt:{type:Date,default:Date.now},
  comments:[],
  rating:{type:String,default:0},
  numberOfRaters:{type:Number,default:0},
});

BizSchema.methods.updateRatings = function(urating){
    this.numberOfRaters += 1;

    this.rating = (this.rating + urating) / this.numberOfRaters;
}

BizSchema.pre("save",function(next){
     now = new Date();
     if(!this.createdAt){
        this.createdAt = now;
     }
     next();
});

mongoose.model("Biz",BizSchema);
