var mongoose = require('mongoose');


var MapSchema = mongoose.Schema({

  title:String,
  location:[],
  createdAt:{type:Date,default:Date.now},
  price : {type:Number,default:0},
  createdBy:String,

});

MapSchema.pre("save",function(next){

  now = new Date();
  if(!this.createdAt){
    this.createdAt = now;
  }

  next();

});

mongoose.model("Map",MapSchema);
