console.log('Starting app');

setTimeout(() => {
	console.log('Inside the callback');
}, 2000);

setTimeout(() => {
	console.log('Inside the 2nd callback');
}, 0);

console.log('Finishing up');