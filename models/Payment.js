var mongoose = require("mongoose");
var User = mongoose.model("User");


var PaymentSchema = mongoose.Schema({

  createdBy:String, // the person that created this object i.e the payer for the product
  productId:String, // the product owner e.g the tutor id, the designer id
  productType:String,
  createdAt:{type:Date,default:Date.now},
  transactionDetails:[]
});

PaymentSchema.pre("save",function(next){
    now = new Date();
    if(!this.createdAt)
    {
      this.createdAt = now;
    }
    next();
});

PaymentSchema.methods.getUserById = function(userId){

    var query = User.findById(userId);

    query.exec(function(err,user){
        return user;
    });

}

PaymentSchema.methods.getProductById = function(productId,productType){

    var query = productType.findById(productId);

    query.exec(function(err,product){
        return product;
    });

}

mongoose.model("Payment",PaymentSchema);
