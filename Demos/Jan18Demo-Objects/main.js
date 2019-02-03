// object literal
// data - key value pairs
var me = {
    name: "micheal",
    age: 29,
    favoriteShow:['JerseyShore', 'Survivor'],
    address: {
        street: "123 main st",
        city: "halifax"
    },
    isRich: false,
    sayHi: function() {console.log('hi')}
}

console.log(me.age);

var foo = "name";
console.log(me.address.street);
console.log(me["address"]["street"]);
console.log(me["address"].street);

console.log(me["address.street"]);
me.sayHi();




console.log("==============")
console.log(me.address["street"]);





// window.setTimeout(function(){alert('timedout');}, 2000);//1.  wait for 2 seconds. 3. excute 2 seconds later

/*
window.alert('secondLine'); // 2. this code excutes while waiting for the first line
//above: function acting as a piece of data
*/


/*
var seconds = 0;

window.setInterval(
    function(){
        seconds++;
        console.log(seconds);
    }, 1000);

*/
/*
// objects and functions

// functions are objects (ie.data)

function doSomethingThatTakesAWhile(name, shoeSize, function(){})
{
    // hit a data source in Australia
    // takes 2 seconds to get the data
    // callback! 
    //Simply put: A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’.
}

var myFunction = function() {
    console.log('hello from the function');
};

function myFunction(information) {
    console.log('hello from the function' + information)
}


Car car = new Car();
car.drive(); //methods
//are functions data and excutable code?

*/


var myNextBirthday = new Date('7-28-2019');
//difference between next birthday and 



console.log(Date.now());