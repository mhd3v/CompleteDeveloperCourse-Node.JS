console.log('Starting notes.js');

const fs = require('fs');

var addNote = (title, body) => {

	var notes = [];

	var note = {

		title,
		body

	};

	try { //will run if no data in notes-data.json

		var notesString = fs.readFileSync('notes-data.json');

		notes = JSON.parse(notesString);
	}
	catch(e){ //else

	}

	var duplicateNotes = notes.filter((note) => note.title === title);
	console.log("Dup notes.",duplicateNotes);

	if(duplicateNotes.length === 0){

		notes.push(note);

		fs.writeFileSync('notes-data.json', JSON.stringify(notes));
	}

	else
		console.log('note already exists');
	
	
};




var getAll = () => {

	console.log('Getting all notes');

};


var getNote = (title) => {

	console.log('Getting note', title);

};

var removeNote = (title) => {

	console.log('Removing note', title);

};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
}