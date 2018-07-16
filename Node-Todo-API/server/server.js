var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose'); //we're not requiring plain 'mongoose' here because we want to get the object that cofigured in the mongoose.js file (local export)
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); //body parser lets us send json to our server

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save(todo).then((doc) => {
        res.send(doc); //if successfully saved to db, send the object back to the requester
    }, (err) => {
        res.status(400).send(err); //we're setting a status of 400 (bad request)
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});
