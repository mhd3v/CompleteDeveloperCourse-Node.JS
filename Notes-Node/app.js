const fs = require('fs');

const os = require('os');

const notes = require('./notes.js');

const yargs = require('yargs')

//const _ = require('lodash');
//console.log(_.isString("hey"));
// var filteredArray = _.uniq([2,4,2,4]);
// console.log(filteredArray);

const argv = yargs.argv;

var cmd = argv._[0];

//console.log('Command:', cmd);

if(cmd == "add") {
	notes.addNote(argv.title, argv.body);
}

else if(cmd == "list") {
	notes.getAll();
}

else if(cmd == "read") {
	notes.getNote(argv.title);
}

else if(cmd == "remove") {
	notes.removeNote(argv.title);
}
else{
	console.log("Command not recongnized");
}

// console.log('process argv', process.argv);

//console.log('Yargs', argv);