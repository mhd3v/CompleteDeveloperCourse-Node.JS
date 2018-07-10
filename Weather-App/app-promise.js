const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address); //takes a string and converts it to HTTP compatible address

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAPk8yTO3SCJE0VD9DoLDU8rpMtqvsdFbw`;

axios.get(geocodeUrl).then((response) => { //axios provides promises by default (dont need wrapper)

	if(response.data.status === "ZERO_RESULTS") 
		throw new Error('Unable to find address');

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/5773bf018c6d78acf192da09be8464ae/${lat},${lng}?units=si`;

	console.log(response.data.results[0].formatted_address); //wont run if no address found. goes directly to catch

	return axios.get(weatherUrl); //chain call to weather api

}).then((response) => { // then for the weather api call
	var temp = response.data.currently.temperature;
	var apparentTemp = response.data.currently.apparentTemperature;

	console.log(`It's currently ${temp}. It feels like ${apparentTemp}.`)

}).catch ((e) => {
	if(e.code === "ENOTFOUND")
		console.log("Unable to connect to API servers");
	else
		console.log(e.message); //catch custom error
});