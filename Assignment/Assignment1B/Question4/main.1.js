/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: 
    Write a JavaScript program to iterate through an array of ten(10) positive randomly generated numbers. Each number will then be checked to see if it’s a primary number.
•	Sample Expected output (console.log()).
23-yes, 15-no, 22-no, 124-no, 11-yes, 9-no, 2-yes, 13-yes, 5-yes, 1-no
*/

function checkPrimaryNumber()
{
    // Input and variables
    var numberArray = [23, 15, 22, 124, 11, 9, 2, 13, 5, 1];

    // Processing

    for(var i = 0; i < numberArray.length; i++)
    {
        // assume that every number in the array is a prime number.
        primeFlag = true;

        if(numberArray[i] == 1)
        {
            primeFlag = false;
            console.log(`${numberArray[i]}-no`)
            break;
        }

        // check factors from 2 to a number less than selected number (ex. 2 ~ 22)
        for(var j = 2; j < numberArray[i]; j++)
        {

            if(numberArray[i] % j == 0)
            {
                // if the remainder is 0, it means there are more factors. = not a prime number. 
                primeFlag = false;
                console.log(`${numberArray[i]}-no`)
                // if factor appears, there's no need to check more. so use break to leave the for loop.  
                break;
            }
        }

        if(primeFlag)
        {
            console.log(`${numberArray[i]}-yes`)
        }

    }

    // Return

}
console.log("===============")
checkPrimaryNumber();

// Output
