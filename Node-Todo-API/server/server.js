var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //tell mongoose to use default JS promises

mongoose.connect('mongodb://localhost:27017/TodoApp');

//We define the model (schema) for a collection in mongoose since it's an ORM? 
//we defined a model for Todo, moongose automatically made a collection of todos when we ran the code

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, //mongoose validator
        minlength: 1,     //mongoose validator
        trim: true       //remove whitespaces
    },

    completed: {
        type: Boolean,
        default: false
    },

    completedAt: {
        type: Number,
        default: null
    }
});


// //var newTodo = new Todo({text: 'Cook dinner'}); //create a new instance of the Todo model
// var newTodo = new Todo({text: 'Do Node course', completed: false, completedAt: 12});

// //newTodo.save() //returns a promise
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (err) => {
//     console.log('Unable to save todo');
// });

//==========================================================================================
//Task - Make User model (email - require it - trim it - set type - set min length)

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var newUser = new User({
    email: 'mhd3v@mhd3v'
});

newUser.save().then((doc) => {
    console.log('Saved user', doc);
}, (err) => {
    console.log('Unable to save user');
});