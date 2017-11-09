// const fs = require('fs');

// const os = require('os');

const notes = require('./notes.js');

const yargs = require('yargs');

//const _ = require('lodash');
//console.log(_.isString("hey"));
// var filteredArray = _.uniq([2,4,2,4]);
// console.log(filteredArray);

var titleOptions = {

	describe: 'Title of note',
	demand: true,
	alias: 't'
}

var bodyOptions = {

	describe: 'Body of the note',
	demand: true,
	alias: 'b'
}

const argv = yargs
			.command('add','Add a new note', {//options obj
				title:titleOptions,
				body: bodyOptions
			})
			.command('list','List all notes')
			.command('read', 'Read a notes', {
				title:titleOptions
			})
			.command('remove','Remove note', {
				title:titleOptions
			})
			.help()
			.argv;

var cmd = argv._[0];

console.log('Command:', cmd);

if(cmd == "add") {
	note = notes.addNote(argv.title, argv.body);
	
	if(note){
		console.log(`Note added`);
		notes.logNote(note);
	}

	else
		console.log("Note not added!");
}

else if(cmd == "list") {
	var allNotes = notes.getAll();

	console.log(`Printing ${allNotes.length} notes!`);

	allNotes.forEach((note) => {
		notes.logNote(note);
	});
}

else if(cmd == "read") {
	var note = notes.getNote(argv.title);

	if(note) {
		console.log('Note found! Printing:');

		notes.logNote(note);
	}

	else {
		console.log("Note not found");
	}
}

else if(cmd == "remove") {
	var noteRemoved = notes.removeNote(argv.title);

	var message = noteRemoved ? 'Note was removed!' : 'Note not found';

	console.log(message);
}
else
	console.log("Command not recognized");


// console.log('process argv', process.argv);

//console.log('Yargs', argv);