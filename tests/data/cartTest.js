import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {

    //first tst for first condition
    it('adds an existinf product to the cart', () => {
spyOn(localStorage, 'setItem');

 spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
    }]);
 });
 loadFromStorage();

   addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart.length).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart[0].quantity).toEqual(2);
    });

    //second test for second condition
    it('adds a new product to the cart', () => {


        spyOn(localStorage, 'setItem');

 //another function of jsmine called spyon and we give two parameter the first is object
 //that we want to mock in our case localStorage,getItem is here method
 //this will replace the localStorage.getItem with a fack version and we can make this facke
 //version do anything we want, to do that spyOn gives us an object and this object has property we can use
 //the property called and. and this result is also an object and this object has a method called dot callFake
 //.callFake. next we're going to give call fake a function brackets arrow and curly brackets

 spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([]);
 });
 loadFromStorage();

     addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart.length).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart[0].quantity).toEqual(1);
    });
});