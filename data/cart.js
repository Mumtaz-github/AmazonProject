//here we get the cart from localstrage instead of default value
//second we reconvert the string back to the array and use JSON.parse for this
/* 
for verification 2janvier
export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2, 
      deliveryOptionId: '1'
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
      deliveryOptionId: '2'
}];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

 export function addToCart(productId) {  
 let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
           matchingItem = cartItem;
        }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;  

    } else {
        cart.push({
        productId: productId,
       quantity: 1,
    
        deliveryOptionId: '1'
     });
    }

saveToStorage();

 } 

*/
export let cart = JSON.parse(localStorage.getItem('cart'));


// if the cart is empty we just gave it default the below value 
if (!cart) {
cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,

  deliveryOptionId: '1'

    //here we'll not other detail like price etc manually
    //but we'll use id to take data for product and this tecnique
    // called dduplicating the data or Normalizing the data
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,

    deliveryOptionId: '2'
}];
}


//we save to the localstrage from variable, in localstorage we just save string so we use JSON.stringify to convert it into string
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


//we bring this function from amazon.js because it's belong to 
//cart and it is good to organize the code
 //create a function for part product id and cart
 export function addToCart(productId) {  //added quantity 261225 for chatgpt
 let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
           matchingItem = cartItem;
        }
    });

// if product in the cart we'll just increase its quantity by one 
//product already in the cart
if (matchingItem) {
      matchingItem.quantity += 1;  //added quantity 261225 for chatgpt

    //if the product is not in the cart we'll add to the cart
    } else {
        cart.push({
        productId: productId,
       quantity: 1,
     
        deliveryOptionId: '1'
     });
    }


saveToStorage();

 } 

/*
create 2 janvier for verification
export function removeFromCart(productId) {
const newCart = [];

cart.forEach((cartItem) => {
if (cartItem.productId !== productId) {
newCart.push(cartItem);
}

});

cart = newCart;

saveToStorage();
}

 export function updateDeliveryOption(productId, deliveryOptionId) {
let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
           matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}






*/
 //we create a function for removing a product from the cart
 //step:1, create a new array
 //2. loop through the cart
 //3. add each product to the new array, except for this productId
  export function removeFromCart(productId) {

    //this is array
const newCart = [];

// this is loop and inside function, then object
//so the result of this loop is it's going to contain all 
// the cart items that don't match match this (productId)
cart.forEach((cartItem) => {

    if (cartItem.productId !== productId) {
        newCart.push(cartItem);
    }
});

//the last stpe we gonna take const newCart = []; and replace the on the top of this page
cart = newCart;

saveToStorage();
 }


 //to update delivery option in the cart and the page
 export function updateDeliveryOption(productId, deliveryOptionId) {
 let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
           matchingItem = cartItem;
        }
    });


    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}




// This code was copied from the solutions of exercises 14f - 14n.
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}