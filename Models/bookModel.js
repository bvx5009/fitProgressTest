//json object of what a book looks like
var mongoose = require('mongoose');
var Schema = mongoose.Schema;      //schema comes from mongoose

var bookModel = new Schema({
    title:{
        type: String
    },
    author:{
        type: String
    },
    genre:{
        type: String
    },
    read:{
        type: Boolean, default: false
    }
});

module.exports = mongoose.model('Book', bookModel); //load this model into mongoose and call it book