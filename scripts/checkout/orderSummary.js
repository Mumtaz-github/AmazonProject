
// step2: to use data to generate the html
//the first step we need to do is to take the cart array from
// cart.js and import it into checkout.js so we can use it


import {cart, removeFromCart, updateDeliveryOption, updateQuantity} from '../../data/cart.js'; //for veryfication 4janvier
import {products, getProduct} from '../../data/products.js';
//import {products} from '../data/products.js'; i need to verify the linke for the product
import { formatCurrency } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; // ESM version of library
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; //dayjs external with javascript modules
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';




//it was practice code to learn external library we dont need so i put in comment for later learn how it work
// const today = dayjs();
//  const deliveryDate = today.add(7, 'days'); 
//  //today.add(7, 'days')this is add method

//  //this method takes this date and converts it into a string with
//  //this format
//  console.log(deliveryDate.format('dddd, MMMM D'));

//render mean to display on the page
//this function should display the order summary on the page
//put all the code inside the function
 export function renderOrderSummary() {

        //to combine all html create a variable to store the result
        let cartSummaryHTML = '';


        //nex we're going to loop through this cart and generate html
        cart.forEach((cartItem) => {
        //to get the product id out of the cart item first
        const productId = cartItem.productId;

        //let create variable to save the result mean full product detail
        const matchingProduct = getProduct(productId);

        //getProduct(productId); replaced the code because we built the function in product.js and and import from there
        // products.forEach((product) => {
        // if (product.id === productId) {
        //     matchingProduct = product;
        // }
        // });


        // console.log(matchingProduct);

        const deliveryOptionId = cartItem.deliveryOptionId;

       const deliveryOption = getDeliveryOption(deliveryOptionId);


    const dateString = calculateDeliveryDate(deliveryOption);

    //we imported the function and replaced this code by = getDeliveryOption;
        // deliveryOptions.forEach((option) => {
        //     if (option.id === deliveryOptionId) {
        //         deliveryOption = option;
        //     }
        // });

       /* const today = dayjs();
        
        const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
            );

            const dateString = deliveryDate.format(
            'dddd, MMMM D'
            ); */

        cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}"> <!--we add specail class-->
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="
                ${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">

                    <!--sharefunction -->
                $${formatCurrency(matchingProduct.priceCents)}
                    </div>

                    <div class="product-quantity 
                    js-product-quantity-${matchingProduct.id}"> <!--this line added jsmine test-->
                        <span>
                       
                                <!-- This code was copied from the solutions of exercises 14f - 14n. -->
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link"
                        data-product-id="${matchingProduct.id}">
                            Update
                        </span>

   
                 <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingProduct.id}">
                Save
              </span>

                        <span class="delete-quantity-link link-primary js-delete-link
                  <!--js-delete-link-with matchingProduct.id add for jasmine test--> 
                        js-delete-link-${matchingProduct.id}" 
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
                    ${deliveryOptionsHTML(matchingProduct, cartItem)} 
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
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
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
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  // This code was copied from the solutions of exercises 14f - 14n.
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        const newQuantity = Number(quantityInput.value);
        updateQuantity(productId, newQuantity);

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();

        // We can delete the code below (from the original solution)
        // because instead of using the DOM to update the page directly
        // we can use MVC and re-render everything. This will make sure
        // the page always matches the data.

        // const quantityLabel = document.querySelector(
        //   `.js-quantity-label-${productId}`
        // );
        // quantityLabel.innerHTML = newQuantity;

        // updateCartQuantity();
      });
    });
}

/*
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
        const priceString = deliveryOption.priceCents  === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;


        //which delivery option should be checked
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

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



        document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
        //we basically generating html with javascript and then putting
        //it on the page


        document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
        link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId); //update data after delete

        //this dom delete the product from page , and .remove() use with
        //dom 
        const container = document.querySelector(
        `.js-cart-item-container-${productId}`
        );
        container.remove(); // i have to check it not sure for this


        //regenerate all the html after delete
        renderPaymentSummary(); //if i put in comment the jsmine test passed if i remove the comment faild
        });
        });



        document.querySelectorAll('.js-delivery-option') 
        .forEach((element) => {
        element.addEventListener('click', () => {

        //shorthand property
        //
        const {productId, deliveryOptionId} = element.dataset; 
        updateDeliveryOption(productId, deliveryOptionId);

        //rerun the code
        renderOrderSummary();
        renderPaymentSummary();
        });  
        });
    }


















  
    //for verification purpose i bring new code here 4janvier
    // run the below function when we load the page




/* today i need to verify this code with other 4janvier
///for verification process 2janvier we wrote this code to find the error
// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary() {

let cartSummaryHTML= '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

 const matchingProduct = getProduct(productId);


const deliveryOptionId = cartItem.deliveryOptionId;

const deliveryOption = getDeliveryOption(deliveryOptionId);



   const today = dayjs();
    const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
    );
    const dateString = deliveryDate.format(
    'dddd, MMMM D'  
    );


cartSummaryHTML += `

 <!-- <div class="cart-item-container 
 js-cart-item-container-${matchingProduct.id}"> <!--added js specail call here js-cart-item-container-->
                    <div class="delivery-date">
                        Delivery date: ${dateString}
                    </div>

                    <div class="cart-item-details-grid">
                        <img class="product-image" 
                        src="${matchingProduct.image}">

                        <div class="cart-item-details">
                            <div class="product-name">
                               ${matchingProduct.name}
                            </div>
                            <div class="product-price">
                               $${formatCurrency(matchingProduct.priceCents)}
                            </div>
                            <div class="product-quantity">
                                <span>
                                    Quantity: <span class="quantity-label">${cartItem.quantity}</span> 
                                </span>
                                <span class="update-quantity-link link-primary">
                                    Update
                                </span>
                                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                                    Delete
                                </span>
                            </div>
                        </div>

                        <div class="delivery-options">
                            <div class="delivery-options-title">
                                Choose a delivery option:
                            </div>
                            
                           ${deliveryOptionsHTML(matchingProduct, cartItem)}
                           
                        </div>
                    </div>
                </div>

`;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
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

const priceString = deliveryOption.priceCents
 === 0
 ? 'FREE'
 : `$${formatCurrency(deliveryOption.
    priceCents)} -`;

const isChecked = deliveryOption.id === 
cartItem.deliveryOptionId;

html += ` 
 <div class="delivery-option js-delivery-option"
 data-product-id="${matchingProduct.id}"
 data-delivery-option-id="${deliveryOption.id}">
    <input type="radio" 
   ${isChecked ? 'checked' : ''} <!--tarnary operator--> 
    class="delivery-option-input"
     name="delivery-option-${matchingProduct.id}">
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

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


//seletec all delet link first
document.querySelectorAll('.js-delete.link')
.forEach((link) => {
link.addEventListener('click', () => {
const productId = link.dataset.productId;
removeFromCart(productId);

const container = document.querySelector(
    `.js-cart-item-container-${productId}`
);
container.remove();

renderPaymentSummary();
});
});


document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;
 updateDeliveryOption(productId, deliveryOptionId);

 //rerun the page or code 
 renderOrderSummary();
 renderPaymentSummary();
});
});
}

*/