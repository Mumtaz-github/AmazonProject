import{cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

//export this function and run inside the checkout.js
export function renderPaymentSummary() {
   let productPriceCents = 0;
   let shippingPriceCents = 0;

   
 cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
  productPriceCents += product.priceCents * cartItem.quantity;

  //create shipping cost
 const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

 //when we loop through the cart we going to do add shippingPriceCents +=
  shippingPriceCents += deliveryOption.priceCents;
    });



    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    //added 4 janvier
let cartQuantity = 0;
cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

    //generate HTML call view
    const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
         <!--   <div>Items (3):</div>-->
           <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;



    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
    // console.log(productPriceCents);
    // console.log(shippingPriceCents);
}