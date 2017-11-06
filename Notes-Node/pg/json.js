// var obj = {

// 	name:'Mahad'

// };


// var stringObj = JSON.stringify(obj);

// console.log(typeof stringObj);

// console.log(stringObj);

// var personString = '{"name": "mahad", "age": 20}';

// var person = JSON.parse(personString);

// console.log(typeof person);

// console.log(person);

const fs = require ('fs');

var orginalNote = {
	title: 'some title',
	body: 'some body'
};

var orginalNoteString = JSON.stringify(orginalNote); // takes a normal JS object and coverts to a string

fs.writeFileSync('notes.json', orginalNoteString);

var noteString = fs.readFileSync('notes.json');

var note = JSON.parse(noteString);

console.log(typeof note);

console.log(note.title);

