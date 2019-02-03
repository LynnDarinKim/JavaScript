//VANILLA JAVASCRIPT
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.write(this.responseText);
    }
};
xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
xhttp.send();

//1 -> 2 -> 7 -> 8 -> 3(callback)-> 4
// request -> response -> do sth when the response is back