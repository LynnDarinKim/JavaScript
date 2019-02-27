// fetch api
fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=data&format=json')
  .then(response => response.json()) // 200ms = function(response) {return resopnse.json()} //when the response's got, pull out-extract the json from the response 
  .then(json => console.log(json)) // 100ms = function(json) {console.log(json)} // pass json into this callback 

// window.fetch()
fetch('https://jsonplaceholder.typicode.com/albums')
  .then(response => response.json())
  .then(data => console.log(data.filter((item, index) => index < 10)))
  .catch(error => console.error(error));

