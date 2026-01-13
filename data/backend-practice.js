
const xhr = new XMLHttpRequest();

//this method listens or waits for an event and then it can run
// a function. this method take two parameters the first paramete
// is the event that we want to listen for or to wait for 
//in this case wan want wait for the response to come back so
//we gonna give it string load, load means the response has 
//loaded. the second parameter is a function that we want to run
//after this event happens, we gonna to run a function 
//so because this function runs after the response loaded
//
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});


//setup message
// xhr.open('GET', 'https://supersimplebackend.dev/documentation');
xhr.open('GET', 'https://supersimplebackend.dev');

//to send it the message
xhr.send();

