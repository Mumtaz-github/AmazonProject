//this function do the same thing as we have amazon.js and checkout.js ; so it will replace both and work for both
 export function formatCurrency(priceCents) {
return (priceCents / 100).toFixed(2);
}


export default formatCurrency;