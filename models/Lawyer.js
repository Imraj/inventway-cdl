var mongoose = require('mongoose');

var LawyerSchema = mongoose.Schema({

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
  rating:{type:Number,default:0},
  numberOfRaters:{type:Number,default:0},
  

});

LawyerSchema.methods.updateRating = function(urating){
    this.numberOfRaters += 1;

    this.rating = (this.rating + urating) / this.numberOfRaters;
}

LawyerSchema.pre("save",function(next){
     now = new Date();
     if(!this.createdAt){
        this.createdAt = now;
     }
     next();
});

mongoose.model("Lawyer",LawyerSchema);
