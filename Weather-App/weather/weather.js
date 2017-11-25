
const request = require('request');

var getWeather = (lat, lan, callback) => {

	request({

		url: `https://api.darksky.net/forecast/5773bf018c6d78acf192da09be8464ae/${lat},${lan}?units=auto`,
		json: true

	}, (error, response, body) => {

		if(!error && response.statusCode === 200)
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemp: body.currently.apparentTemperature
			});

		else
			callback('unable to fetch weather');

	});

};

module.exports ={
	getWeather
};