var mongoose = require('mongoose');

var TermSchema = new mongoose.Schema({

  word : {type:String},
  description : {type:String}

});

module.exports =mongoose.model("Term",TermSchema);
