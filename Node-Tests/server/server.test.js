const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {

    describe('GET /', () => {

        it('should return hello world response', (done) => {

            request(app)
            .get('/')
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                    error: 'Page not found'
                });
            }) //response that we're expecting from the server
            .end(done);
        
        });
    });
    

    describe('GET /users', () => {

        it('should include my user object', (done) => {
    
            request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                    name: 'Mahad',
                    age: 21
                })
            })
            .end(done);
        
        });
    });

});

