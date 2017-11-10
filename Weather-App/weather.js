const request = require('request'); //external module for http requests

const yargs = require('yargs');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true //will parse a's data as a string
		}
	})
	.help()
	.alias('help', 'h') //set alias for help, so user can just write -h instead of --help
	.argv;

var encodedAddress = encodeURIComponent(argv.a); //takes a string and converts it to HTTP compatible address

request({ // function of request module
	url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
	json: true
}, (error, response, body) => { //callback function, ran when data is returned from http request

	console.log(`Address: ${body.results[0].formatted_address}`);

	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);

	console.log(`Longitude: ${body.results[0].geometry.location.lng}`);

});