
// step2: to use data to generate the html
//the first step we need to do is to take the cart array from
// cart.js and import it into checkout.js so we can use it

import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; // ESM version of library
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; //dayjs external with javascript modules
import {deliveryOptions} from '../data/deliveryOptions.js';


hello();

const today = dayjs();
 const deliveryDate = today.add(7, 'days'); 
 //today.add(7, 'days')this is add method

 //this method takes this date and converts it into a string with
 //this format
 deliveryDate.format('dddd, MMMM D');

//to combine all html create a variable to store the result
let cartSummaryHTML = '';


//nex we're going to loop through this cart and generate html
cart.forEach((cartItem) => {
//to get the product id out of the cart item first
const productId = cartItem.productId;

//let create variable to save the result mean full product detail
let matchingProduct;

products.forEach((product) => {
 if (product.id === productId) {
    matchingProduct = product;
 }
});


// console.log(matchingProduct);

const deliveryOptionId = cartItem.
deliveryOptionId;

let deliveryOption;

deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
        deliveryOption = option;
    }
});

const today = dayjs();
const deliveryDate = today.add(
  deliveryOption.deliveryDays,
  'days'
    );
    const dateString = deliveryDate.format(
     'dddd, MMMM D'
    ); 

cartSummaryHTML += `
 <div class="cart-item-container 
 js-cart-item-container-${matchingProduct.id}"> <!--we add specail class-->
    <div class="delivery-date">
        Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">

            <!--sharefunction -->
           $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id="${matchingProduct.id}"> <!--here we add data attribute -->
                    Delete
                </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>

            <!--here we run this function to generate it-->
            ${deliveryOptionsHTML(matchingProduct, 
            cartItem)} 
        </div>
    </div>
</div>
`;
});

//steps: 1. Loop through deliveryOptions
 //2. For each option, generate some HTML
 //3. Combine the HTML together
function deliveryOptionsHTML(matchingProduct, cartItem) {

//variable for save the result
let html = '';



deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
deliveryOption.deliveryDays,
'days'
    );
    const dateString = deliveryDate.format(
     'dddd, MMMM D'
    );  

    //here used ternary operator
const priceString = deliveryOption.priceCents 
=== 0
? 'FREE'
: `$${formatCurrency(deliveryOption.
    priceCents)} -`;


//which delivery option should be checked
const isChecked = deliveryOption.id === 
cartItem.deliveryOptionId;

    html += `
  <div class="delivery-option js-delivery-option" 
   data-product-id="${matchingProduct.id}"
   data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
       ${isChecked ? 'checked' : ''}
        class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
            <div class="delivery-option-date">
            ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
        </div>
    </div>
   `
});


return html;

}



document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML;
//we basically generating html with javascript and then putting
//it on the page


document.querySelectorAll('.js-delete-link')
.forEach((link) => {
link.addEventListener('click', () => {
 const productId = link.dataset.productId;

 
 removeFromCart(productId);

 //this dom delete the product from page , and .remove() use with
 //dom 
  const container = document.querySelector(
  `.js-cart-item-container-${productId}`
 );
container.remove();
});
});

document.querySelector('.js-delivery-option') 
.forEach(() => {
  Element.addEventListener('click', () => {

//shorthand property
//
    const {productId, deliveryOptionId} = element.dataset; 
updateDeliveryOption(productId, deliveryOptionId);
  });  
});