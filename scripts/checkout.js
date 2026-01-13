//named export
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/backend-practice.js';
//import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js'added 2janvier for verification
//import {products} from '../data.products.js' added 2janvier for verification
//import {formatCurrency} from './utils/money.js'; added 2janvier for verification
// import {deliveryOptions} from '../data/deliveryOptions.js';
import '../data/cart-class.js'; // this run all the code 
import {formatCurrency} from './utils/money.js'; 
import {updateDeliveryOption} from '../data/cart.js';

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
