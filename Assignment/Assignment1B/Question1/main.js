/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Assignment 1B Question 1

Write a function in JavaScript that will receive a string as a parameter and then perform the following:

•	You don’t have to prompt for a string. Simply assign a string to a variable in your code as your starting point to use as an argument for your function.
•	If the first and last characters of the string are the same (ignoring case), the function will return the string in reverse order. Otherwise, the function will return the string with the first and last letters removed.
•	Example: “Triscuit” returns “tiucsirT” but “Cracker” returns “racke”.

*/

function modifyString (string)
{
    // Input and variables
    var splitString = [];
    var firstChar = "";
    var lastChar = "";
    var removedString = "";
    var reversedArray = [];
    var reversedString = "";


    // Processing
    splitString = string.split("");
    firstChar = splitString[0];
    lastChar = splitString[splitString.length-1];

    
    if(firstChar.toLowerCase() === lastChar)
    {
        reversedArray = splitString.reverse();

        reversedString = reversedArray.join("");

        return reversedString
    }
    else
    {
        removedString = string.substring(1,string.length-1)

        return removedString;
    }

}


    // Output
    console.log(modifyString ("Triscuit"))
    console.log(modifyString ("Cracker"))


