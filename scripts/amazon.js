

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
         $${(product.priceCents / 100).toFixed(2)}
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
        //   data-product-name="${product.name}">
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

 document.querySelectorAll('.js-add-to-cart')
 .forEach((button) => {
    button.addEventListener('click', () => {
        //the dataset property basicall gives us all the data attributes that
        //are attached to this button 
     const productId =  button.dataset
     .productId;

     //to check that this product already in the cart
     //item is parameter, it contain product name and quantity
     //we used loop here
     //we save it in variable for later use and we create outside the scope
 let matchingItem;

        cart.forEach((item) => {
        if (productId === item.productId) {
        matchingItem = item;
        }
    });

//if product in the cart we'll just increase its quantity by one 
if (matchingItem) {
    matchingItem.quantity += 1;

    //if the product is not in the cart we'll add to the cart
    }else  {
   Cart.push({
        productId: productId,
        quantity: 1
     });
    }
  
    });
 });