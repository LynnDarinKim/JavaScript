"use strict";
var readlineSync = require('readline-sync');

/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Assignment 1B Question

Write a function in JavaScript that will receive a string as a parameter and then perform the following:

•	You don’t have to prompt for a string. Simply assign a string to a variable in your code as your starting point to use as an argument for your function.
•	If the first and last characters of the string are the same (ignoring case), the function will return the string in reverse order. Otherwise, the function will return the string with the first and last letters removed.
•	Example: “Triscuit” returns “tiucsirT” but “Cracker” returns “racke”.

*/

function main()
{
    // Input and variables
    var string = "Triscuit";
    var firstLetter = "";
    var lastLetter = "";
    var middleLetter = "";

    // Processing

    middleLetter = string.substring(1, str.length-1);

    if(string.substring(0,1) === string.substring(string.length - 1, string.length))
    {
        firstLetter = string.substring(string.length - 1, string.length);
        lastLetter = string.substring(0,1);
    }


    // Output

    console.log(firstLetter + middleLetter + lastLetter)
}
	
if (require.main === module)
{
    main();
}