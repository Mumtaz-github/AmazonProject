
export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    //here we'll not other detail like price etc manually
    //but we'll use id to take data for product and this tecnique
    // called dduplicating the data or Normalizing the data
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];


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