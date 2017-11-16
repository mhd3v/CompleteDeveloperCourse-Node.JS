const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.a, (errorMessage, results) => {

	if(errorMessage)
		console.log(errorMessage);

	else
		console.log(JSON.stringify(results, undefined, 2));

});