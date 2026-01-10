import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


//data for delivery options
 export const deliveryOptions = [{

  id: '1',
  deliveryDays: 7,
  priceCents: 0  
}, {
   id: '2',
   deliveryDays: 3,
   priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];



export function getDeliveryOption(deliveryOptionId) {
let deliveryOption;

        //this will take this (deliveryOptionId) and get the delivery option
        // let deliveryOption; from the above array 
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        //let's return delivery option so we can use it outside of this funtion
        //and just to be safe let's also give this a default value if we dont
        //find the delivery option so we use default operator || OR
        //and let's make the default value the first delivery option [0];
    //  return deliveryOption || deliveryOptions[0]; 4janvier put in comment

    //added 4 janvier
      return deliveryOption;
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
 export function calculateDeliveryDate(deliveryOption) {
//   const today = dayjs();
//   const deliveryDate = today.add(
//     deliveryOption.deliveryDays,
//     'days'
//   );




let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
 }