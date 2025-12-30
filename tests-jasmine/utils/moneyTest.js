import {formatCurrency} from '../../scripts/utils/money.js';

//we created our first test suite using Jasmine
describe('test suits: formatCurrency', () => {
    
    //another function it() and this create a test
    it('converts cents into dollars', ()=> {

        //another function to do all of this called expect
        //expect lets us compare a value to another value
        //expect gives us object and objects have many methods
        //one is toEqual()
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    //create another test
    it('works with 0', () => {
   expect(formatCurrency(0)).toEqual('0.00');
    });


    //third test using Jasmine
    it ('rounds up to the nearest cent',() => {
    expect(formatCurrency(2000.5)). toEqual('20.01'); 

    });
});