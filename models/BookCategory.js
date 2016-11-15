var mongoose = require('mongoose');

var BookCategorySchema = mongoose.Schema({

  name:String

});

mongoose.model("BookCategory",BookCategorySchema);
