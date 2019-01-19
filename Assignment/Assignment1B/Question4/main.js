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
    var number1 = 23;
    var number2 = 124;

    // Processing
    for(var i = 2; i < number1; i++)
    {
        if(number1 % i === 0)
        {
            return false;
        }
        return number1 !==1 && number1 !==0;
    }

    // Return

}

// Output
