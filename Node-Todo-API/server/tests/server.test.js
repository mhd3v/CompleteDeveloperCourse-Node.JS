const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//beforeEach lets us run some code before each test
//we're using it so that we can check only if the new note was added or not
beforeEach((done) => {      
    Todo.remove({}).then(() => done());
}); 

describe('POST /todo', () => {
    it('should create a new todo', (done) => {

        var text = "testing string";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {

            if(err)
                return done(err);
            //else
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e)); 
        });
    });

    it('should not create todo with invalid body data', (done) => {

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err)
                return done(err);
                
            //else
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });

    });

});
