/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Assignment 1B Question 4
    Write a JavaScript program to iterate through an array of ten(10) positive randomly generated numbers. Each number will then be checked to see if it’s a primary number.
•	Sample Expected output (console.log()).
23-yes, 15-no, 22-no, 124-no, 11-yes, 9-no, 2-yes, 13-yes, 5-yes, 1-no
*/



// Input and variables
var randomNumber = 0;
var numberArray = [];
var stringOutput = "";


// Processing

// generate random number and push it into the numberArray array 10 times 
//random number generator cited from my previous code practice file with Micheal Crocker. 
for(var a = 0; a < 10; a++)
{
    randomNumber = Math.floor(Math.random() * (124 - 1 + 1)) + 1;

    numberArray.push(randomNumber);
}


for(var i = 0; i < numberArray.length; i++)
{
    // assume that every number in the array is a prime number.
    primeFlag = true;

    // 1 is not a prime number. 
    if(numberArray[i] === 1)
    {
        primeFlag = false;
        numberArray[i] = numberArray[i] + "-no";
        break;
    }

    // check factors from 2 to a number less than selected number (ex. 2 ~ 22)
    for(var j = 2; j < numberArray[i]; j++)
    {

        if(numberArray[i] % j === 0)
        {
            // if the remainder is 0, it means there are more factors. = not a prime number. 
            primeFlag = false;
            numberArray[i] = numberArray[i] + "-no";
            // if factor appears, there's no need to check more. so use break to leave the for loop.  
            break;
        }
    }

    if(primeFlag)
    {
        numberArray[i] = numberArray[i] + "-yes";
    }

}

// get a string from number array and join with , 
stringOutput = numberArray.join(', ');

// Output
console.log("Output:");
console.log(stringOutput)

