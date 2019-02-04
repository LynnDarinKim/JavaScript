// fetch api
fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=data&format=json')
  .then(response => response.json()) // 200ms = function(response) {return resopnse.json()} //when the response's got, pull out-extract the json from the response 
  .then(json => console.log(json)) // 100ms = function(json) {console.log(json)} // pass json into this callback 

  // the rest of the code will be excuted
alert('hello')

// for assignment2b.. choose something like random cat
// two levels of data example: https://swapi.co/


// assignment 2c : https://deckofcardsapi.com/
// retrieve deck display 5 cards
// highest combination ..