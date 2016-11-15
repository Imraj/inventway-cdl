var mongoose = require('mongoose');

var QuizLanguageSchema = mongoose.Schema({

  name:String

});

mongoose.model("QuizLanguage",QuizLanguageSchema);
