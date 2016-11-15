var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({

    text : {type:String},
    optionA : {type:String},
    optionB : {type:String},
    optionC : {type:String},
    answer : {type:String},
    keywords : {type:String},
    terms : [{type: mongoose.Schema.Types.ObjectId, ref:"Term"}]

});

module.exports = mongoose.model("Question",QuestionSchema);
