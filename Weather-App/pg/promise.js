var somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		//resolve('Hey, it worked!');
		reject('Unable to fulfill promise');
	}, 2500);
	
});

somePromise.then((message) => { //somePromiseObject.then(firstMethod_ifResolved, secondMethod_ifFailed)
	console.log('Success', message);
}, (errorMessage) => {
	console.log('Error', errorMessage);
});
