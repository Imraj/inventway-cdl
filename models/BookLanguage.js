var mongoose = require('mongoose');

var BookLanguageSchema = mongoose.Schema({

  name:String

});

mongoose.model("BookLanguage",BookLanguageSchema);
