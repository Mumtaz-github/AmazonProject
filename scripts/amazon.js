//jboth 
import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
//import * as cartModule from 

let productsHTML = ''; //for combine all the string together 

products.forEach((product) => {
 //   productsHTML = productsHTML +`
productsHTML  += ` <!--shortcut and called accumulator pattern-->

<div class="product-container">
    <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
          ${product.rating.count}
            </div>
          </div>

        
          <div class="product-price">
    <!--this method is for show number with 2 decimal places-->
         ${product.getPrice()} 
          </div>

          <div class="product-quantity-container">
            <select> 
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button 
          button-primary js-add-to-cart"
          data-product-id="${product.id}"> 
            Add to Cart
          </button>
        </div>
        `;
       
 });
//  console.log(productsHTML);


 //use dom to put on page
 document.querySelector('.js-products-grid').innerHTML = productsHTML;



 // function cart quantity apdate
 //this function actually handles updating the web page rather 
 //than managing the cart so we're going to keep this function 
 //inside this file for now
function updateCartQuantity() {
  //create variable to sava all quantity in
   let cartQuantity = 0;

//this is going to loop through each object in the cart
    cart.forEach((cartItem) => {
        //this will add up all the quantities and save it in 
        //let cartQuantity
     cartQuantity += cartItem.quantity;
     
    });

    //dom
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}



 document.querySelectorAll('.js-add-to-cart')
 .forEach((button) => {
    button.addEventListener('click', () => {
        //the dataset property basicall gives us all the data attributes that
        //are attached to this button 
     const productId =  button.dataset.productId;
        addToCart(productId);  //this was not present before until 2/01/2026
        //  need to keep eye 
     //i have to keep on eye on it

     //from 1
/*
     let matchingItem;

     cart.forEach((item) => {
      if (productId === item.productId) {
  matchingItem = item;
      }
     });

     if (matchingItem) {
      matchingItem.quantity += 1;
     }else {
     cart.push({
     productId: productId,
     quantity:1 
    )};
     }
//from 1 to here it is moved to cart.js but there is missing  addToCart(productId); so i will keep eye


     let cartQuantity = 0;

    cart.forEach((item) => {
     cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
    */


    // here we run or call the function for the product and cart
     addToCart(productId);

     //to check that this product already in the cart
     //item is parameter, it contain product name and quantity
     //we used loop here
     //we save it in variable for later use and we create outside the scope

  //here call the function updateCartQuantity
  updateCartQuantity();

    });
 });

















/*
//this bottom code added by chatgpt
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    // get the quantity from the dropdown in the same product box
    const productContainer = button.closest('.product-container');
    const quantity = Number(
      productContainer.querySelector('.js-quantity-selector').value
    );

    addToCart(productId, quantity);
    updateCartQuantity();
  });
});
 updateCartQuantity();


*/