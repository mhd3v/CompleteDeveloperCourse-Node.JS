//==========================================================================================
//destructuring (making varaibles from an object's property (ES6 syntax))

// var myObj = {name: 'mahad', age: 12};
// var {name} = myObj;
// console.log(name);

//=================

//const MongoClient = require('mongodb').MongoClient; 
const {MongoClient, ObjectID} = require('mongodb'); //pull out MongoClient and ObjectID from require('mongodb')

var obj = new ObjectID(); //this will generate a unique mongo obj id

console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:  true} , (err, client) => { //mongodb://localhost:27017/TodoApp will create TodoApp database if it doesnt exist

    if(err)
        return console.log('Unable to connect to server');
     
    console.log('Connected to MonogoDB server'); //will not run if error occurs, since control would be returned because of return

    const db = client.db('TodoApp');

    //==========================================================================================

    //collection is equivalent to table in SQL
    //document is equivalent to an idividual row of SQL
    //field/properties are equivalent to a column in SQL

    //==========================================================================================

    // db.collection('Todos').insertOne({  //insertOne lets us insert a document(row) into our collection

    //     text: 'Something to do',
    //     completed: false

    // }, (err, res) => {

    //     if(err)
    //     return console.log('Unable to insert todo', err);

    //     console.log(JSON.stringify(res.ops, undefined, 2)); //res.ops is an array of all documents(objects/rows) that were inserted

    // });

    //==========================================================================================

    // db.collection('Users').insertOne({
    //     //_id: 23, //if not assigned, a default _id would be assigned
    //     name: 'Mahad',
    //     age: 21,
    //     location: 'Islamabad'
    // }, (err, res) => {

    //     if(err)
    //         return console("Error inserting user into collection");
        
    //     console.log(res.ops[0]._id.getTimestamp()); //the _id property's first 4 bytes are the time stamp (that are automatically set by mongo)
        
    // });

    //==========================================================================================

    //client.collection('Todos').find(); returns a mongodb cursor
    //client.collection('Todos').find().toArray() toArray returns a promise

    // db.collection('Todos').find({ // specify query as a set of key value pairs to find()
    //     _id: new ObjectID('5b4b650f06cb0d2010e177c0')
    
    // }).toArray().then((res) => { 

    //     console.log('Todo List: ');
    //     console.log(JSON.stringify(res, undefined, 2));

    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    //==========================================================================================

    // db.collection('Todos').find({ // specify query as a set of key value pairs to find()
        
    //     //specify query here, as key-value pairs
    //     //_id: new ObjectID('5b4b650f06cb0d2010e177c0')
    
    // }).count().then((count) => { 

    //     console.log(`Todo count: ${count} `);

    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    //==========================================================================================


    db.collection('Users').find({name: 'Mahad'}).toArray().then((documents) => {

        console.log(JSON.stringify(documents, undefined, 2));

    }, (err) => {
        console.log('Unable to fetch to-dos', err);
    });

    //client.close();

});