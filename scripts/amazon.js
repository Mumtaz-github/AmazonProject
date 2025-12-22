//jboth 
import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let productsHTML = '';

products.forEach((product) => {
productsHTML  += `
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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
          ${product.rating.count}
            </div>
          </div>

        
          <div class="product-price">
    <!--this method is for show number with 2 decimal places-->
         $${formatCurrency(product.priceCents)} 
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


 //use dom
 document.querySelector('.js-products-grid').
 innerHTML = productsHTML;



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