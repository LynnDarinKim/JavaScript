
/*
doSomethingCool();

// function declaration -> hoisted
function doSomethingCool() {
  console.log('doing cool stuff')
}
*/

// function expression
/*
var doSomethingCool = function() {
  console.log('doing cool expression stuff')
}

doSomethingCool();
*/

//IMMEDIATELY INVOKED FUNCTION EXPRESSION 

(function(){
  var players = [];
  var runningTotal =0;

  console.log(x);

  var calculateTotal = function() {
    runningTotal + 123236263;
  }

  var switchPlayer = function() {
    players.push('new player');
  }
})();