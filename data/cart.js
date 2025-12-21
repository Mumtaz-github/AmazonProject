
export const cart = [];


//we bring this function from amazon.js because it's belong to 
//cart and it is good to organize the code
 //create a function for part product id and cart
 export function addToCart(productId) {
 let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
           matchingItem = cartItem;
        }
    });

//if product in the cart we'll just increase its quantity by one 
if (matchingItem) {
    matchingItem.quantity += 1;

    //if the product is not in the cart we'll add to the cart
    } else {
cart.push({
        productId: productId,
        quantity: 1
     });
    }

 } 