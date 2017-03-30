var express = require('express'),
    mongoose = require('mongoose'), //ORM, need to open a connection to DB
    bodyParser = require('body-parser'); //need to let our app know we are using it, so we pass it in app


var db = mongoose.connect('mongodb://localhost/bookAPI'); //when app opens it will hold this open and connect
var Book = require('./models/bookModel');



var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); //we have to let it know what we parsing, AKA JSON

//ROUTES
bookRouter = require('./Routes/bookRoutes')(Book);

//USE ROUTES
app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

//Handler for a router, simple one
app.get('/', function (req, res) { //anytime the root / gets hit, it will get the  function req + res (response)
    res.send('test test');
});

app.listen(port, function () {
    //console.log('Gulp is running on my app on PORT:' + port);
});