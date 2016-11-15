var mongoose = require('mongoose');

var QuizCategorySchema = mongoose.Schema({

  name:String

});

mongoose.model("QuizCategory",QuizCategorySchema);
