function sayHello(){
    console.log("Hello");
}

sayHello.language = "English";
sayHello.doSomethingElse = function(){
    console.log("Doing something else")
}

sayHello.doSomethingElse.foo = "bar";

console.log(sayHello());
console.log(sayHello);
console.log(sayHello.language);
console.log(sayHello.doSomethingElse());



// 


var me = {
    name : "Micheal",
    age : "29"
}

console.log(me);

// convert to JSON data

var stringMe = JSO.stringfy(me);
console.log(stringMe);

console.log(JSON.parse(stringMe));