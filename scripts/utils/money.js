//this function do the same thing as we have amazon.js and checkout.js ; so it will replace both and work for both

//this fucntion dispaly cents in dollar
 export function formatCurrency(priceCents) {

    //we add the math.round because with toFixed(2) there some issue with certainer number rounding
    //6.005.toFixed(2) => '6.00' x
     //7.005.toFixed(2) => '7.00' x
      //8.005.toFixed(2) => '8.01' correct
return (Math.round(priceCents) / 100).toFixed(2);
}


export default formatCurrency;