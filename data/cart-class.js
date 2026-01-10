// create our first class
//class is basically object generator
class Cart {
    //this is property
     cartItems; //public property meaning it can be accessed anywhere

      //to make localStorageKey private we use #
      //this is called private property, it means it can only be used 
      //inside this class
      //a property without a # hash in front is called a public property
    #localStorageKey;

    


//new method called contructor
constructor(localStorageKey) {

//here we set the property localStorageKey for the object which was undefined before on the top
this.#localStorageKey = localStorageKey;
this.#loadFromStorage();

}



//load cart from the storage , this point to the object that we generate
//the method looadFromStorage should also only be used inside this class
// to make our code safe we make it private that no one can access from 
//from outside so make it also private
//to make it private this is useful in begger project where people might 
//not be sure which properties and method they're supposed to use outside
//the class and which ones to avoid
     #loadFromStorage() {
this.cartItems = JSON.parse(localStorage.getItem('this.#localStorageKey')); //this point to the object and localStorageKey will access this property


 //we have this method for every object that we generate
if (!this.cartItems) {
this.cartItems = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,

  deliveryOptionId: '1'

 
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,

    deliveryOptionId: '2'
}];

}
}

//this is also method
saveToStorage() {
    localStorage.setItem('this.#localStorageKey', JSON.stringify(this.cartItems));
}


//this is also method
 addToCart(productId) {  
 let matchingItem;

        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
           matchingItem = cartItem;
        }
    });


if (matchingItem) {
      matchingItem.quantity += 1; 

  
    } else {
       this.cartItems.push({
        productId: productId,
       quantity: 1,
        deliveryOptionId: '1'
     });
    }


this.saveToStorage();

 }


//this is also method
removeFromCart(productId) {

const newCart = [];

this.cartItems.forEach((cartItem) => {

    if (cartItem.productId !== productId) {
        newCart.push(cartItem);
    }
});

this.cartItems = newCart;

this.saveToStorage();

 }



//this is alos method
updateDeliveryOption(productId, deliveryOptionId) {
 let matchingItem;

        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
           matchingItem = cartItem;
        }
    });


    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
}
}




//so this generate a new object using our class  and this new object will have all the properties methods that we added above
const cart = new Cart('cart-oop'); 
const businessCart = new Cart('cart-business'); //yo generate another object using this class




console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);



