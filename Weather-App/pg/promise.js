//similar to callbacks but we can provide different functions for success and failure cases


var add = (a, b) => {

	return new Promise((resolve, reject) => {

		setTimeout(() => {

			if(typeof a === "number" && typeof b === "number")
				resolve(a+b);
			else
				reject("Arguments must be numbers!");

		}, 2500);

	});

};

add(1,2).then((res) => {
	console.log(res);
	return add(res, 33); //returns another promise
}).then((res) => { // then on the new promise
	console.log(res);
}).catch((errorMessage) => { // if either of the two promises rejected, this gets called
	console.log(errorMessage);
});
// var somePromise = new Promise((resolve, reject) => {

// 	setTimeout(() => {

// 		resolve("Hey the promise resolved!");
// 		//reject("The promise failed");

// 	}, 2500);

// });

// somePromise.then((successMessage)=> {  //.then(resolvedFunction(), rejectedFunction());
// 	console.log(successMessage);
// }, (failureMessage) => {
// 	console.log(failureMessage);
// });