
const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => { //group utls tests in 'Utils' section

    describe('#add', () => {

        it('should add two numbers', () => {

            var res = utils.add(33,12);
        
            expect(res).toBe(45).toBeA('number'); //chained two assertions. check assertion methods on expect documentation (expect is an assertion library)
        
            // if(res !== 45)
            //     throw new Error(`Expected 45, but got ${res}`);
        
        });//define use case
        
    });
    
    
    
    it('should add two numbers async-ly', (done) => { //done tells mocha that isn't going to finish unless done is called. if done isn't used, the assertion never runs, since its called whenever the async func finishes
    
        utils.asyncAdd(1,3, (res) => {
            expect(res).toBe(4).toBeA('number');
            done();
        });
    
    });
    
    it('should square the number', () => {
    
        var res = utils.square(4);
    
        expect(res).toBe(16).toBeA('number');
    
    });
    
    it('should square a number async-ly', (done) => {
    
        utils.asyncSquare(3, (res) => {
            expect(res).toBe(9).toBeA('number');
            done();
        });
    
    });
    
    // it('should expect some values', () => {
       
    //     // expect(12).toNotBe(11); 
    
    //     //expect({name: 'Mahad'}).toBe({name: 'Mahad'}); //test fails, since toBe uses equality to check 
    
    //     //expect({name: 'Mahad'}).toEqual({name: 'Mahad'}); //test passes
    
    //     //expect([2,3,4]).toInclude(5);
    
    //     //expect([2,3,4]).toExclude(1);
    
    //     // expect({
    //     //     name: 'Mahad',
    //     //     age: 21,
    //     //     location: 'Islamabad'
    //     // }).toInclude({
    //     //     age: 21
    //     // });
        
    // });
    
    
    it('should should set first and last names', () => {
    
        expect(utils.setName({age: 21, location: "Islamabad"}, "Mahad Amir")).toInclude({
           
            firstName: "Mahad",
            lastName: "Amir"
            
        }).toBeA('object');
    
    });

});
