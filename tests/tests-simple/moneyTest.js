import {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suits: formatCurrency');

//first basic test cases
//give the test a name to identity in console
console.log('convert cents into dollars');
 if (formatCurrency(2095) === '20.95') {
    console.log('passed');
 } else {
    console.log('failed');
 }



//seconde test Edge cases
console.log('works with 0');
 if (formatCurrency(0) === '0.00') {
    console.log('passed');
 }else {
    console.log('failed');
 }


 //third test or three test case Edge cases
 console.log('rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
console.log('passed');
}else {
    console.log('failed');
}
