module.exports.add = (a,b) =>  a + b;

module.exports.square = (x) => x * x;

module.exports.asyncAdd = (a, b, callback) => {

    setTimeout(() => {

        callback(a + b);

    }, 1000);

};

module.exports.asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(a * a);
    }, 1000);
};

module.exports.setName = (user, fullName) => {

    var names = fullName.split(' '); //split on empty space

    user.firstName = names[0];
    user.lastName = names[1];

    return user;

}
