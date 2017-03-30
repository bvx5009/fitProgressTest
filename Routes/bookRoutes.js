var express = require('express');

var routes = function (Book) {
    //creating a router
    var bookRouter = express.Router();
    bookRouter.route('/')
        //POST
        .post(function (req, res) {
            var book = new Book(req.body); //creates new book and we need to pass in data that goes into that book
            book.save();
            res.status(201).send(book); //sending that book back so it can be avaliable in client
        })

        //GET
        .get(function (req, res) { //request from the client, response we sending back

            var query = {}; //Gets JSON object as a filter search

            if (req.query.genre) //This allows us to only filter by genre or whatever we want to specify
            {
                query.genre = req.query.genre;
            }
            Book.find(query, function (err, books) { //comes from the book scehma that defines it, callback contains error and books.
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books); //if error then show err, if good, then return res Json..
            });
        });
    //GET BY ID
    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) { //comes from the book scehma that defines it, callback contains error and books.
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send("No book found");
            }
        });
    })
    bookRouter.route('/:bookId')
        .get(function (req, res) { //request from the client, response we sending back
            res.json(req.book); //middlewear uptop gets the book then goes here, if not it will show 404
        })

        //PUT, updates whole thing
        .put(function (req, res) {
            req.book.title = req.body.title; //have to get the book first, then update it
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
            if (err)
                res.status(500).send(err);
            else{
                res.json(req.book);//if error then show err, if good, then return res Json..
                }
            });
        })
        //PATCH, updates 1 field
        .patch(function (req, res) {
            if (req.body._id)           //we dont want to update the id so we delete it if its there
                delete req.body._id;
            for (var p in req.body) 
            {
                req.book[p] = req.body[p];
            }
            req.book.save(function(err){
            if (err)
                res.status(500).send(err);
            else{
                res.json(req.book);
                }
            });
        })
        //DELETE/REMOVE
        .delete(function(req,res){
            req.book.remove(function(err){
                if(err)
                {
                res.status(500).send(err);
            }
            else
            {
                res.status(204).send('Removed');
            }
            });
        });

    return bookRouter;
};

module.exports = routes;