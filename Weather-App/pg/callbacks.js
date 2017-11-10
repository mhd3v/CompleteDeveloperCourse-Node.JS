var getUser = (id, callback) => {
	var user = {
		id:12,
		name: 'mahad'
	};
	setTimeout(() => {
		callback(user);
	}, 3000);
	
};

getUser(12, (user) => {
	console.log(user);
});