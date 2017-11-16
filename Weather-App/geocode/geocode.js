const request = require('request'); //external module for http requests

var geocodeAddress = (address, callback) => {

	var encodedAddress = encodeURIComponent(address); //takes a string and converts it to HTTP compatible address

	console.log(encodedAddress);

	request({ // function of request module
	url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
	json: true
}, (error, response, body) => { //callback function, ran when data is returned from http request

	if(error){
		callback('Unable to connect to Google servers');
	}

	else if (body.status === "ZERO_RESULTS"){
		callback('Unable to find location');
	}

	else if(body.status === "OK")
	{	
		callback(undefined, results = {
			address: body.results[0].formatted_address,
			latitude: body.results[0].geometry.location.lat,
			longitude: body.results[0].geometry.location.lng,
		});

	}
	

});

}

module.exports = {
	geocodeAddress
}