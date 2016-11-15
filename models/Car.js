var mongoose = require('mongoose');


var CarSchema = mongoose.Schema({

   name:String,
   make:String,
   year:String,
   price:String,
   description:String,
   features:[],
   images:[],
   video:String,
   email:String,
   skype:String,
   createdAt:{type:Date,default:Date.now},
   createdBy:String,
   activeCarSub:{type:Boolean,default:false},
   carSubscription:[]

});

CarSchema.methods.isActiveCarSub = function(){
  return this.activeCarSub;
}

CarSchema.pre("save",function(next){
    now = new Date();

    if(!this.createdAt){
      this.createdAt = now;
    }

    next();

})

mongoose.model("Car",CarSchema);
