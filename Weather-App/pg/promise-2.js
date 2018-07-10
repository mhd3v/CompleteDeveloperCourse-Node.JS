const request = require("request");

var geoCodeAddress = (address) => {

    return new Promise((resolve, reject) => {

        var encodedAddress = encodeURIComponent(address); //takes a string and converts it to HTTP compatible address

        request({ // function of request module
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
        }, (error, response, body) => { //callback function, ran when data is returned from http request
    
        if(error){
            reject('Unable to connect to Google servers');
        }
    
        else if (body.status === "ZERO_RESULTS"){
            reject('Unable to find location');
        }
    
        else if(body.status === "OK")
        {	
            resolve(results = {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
            });
    
        }
        
    
    });
    

    });

    
};

geoCodeAddress('islamabad').then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})
    