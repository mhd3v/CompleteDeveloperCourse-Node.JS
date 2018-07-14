const express = require('express');

var app = express();

app.get('/', (req, res) => {

    res.status(200).send({
        error: 'Page not found',
        name: 'mhd3v'
    });

});

app.get('/users', (req, res) => {

    res.status(200).send([{name: 'Mahad', age: 21}, {name: 'Ali', age: 20}]);

});

app.listen(3100);

module.exports.app = app;