/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Write a function in JavaScript that will return the sum of the longest streak of consecutive numbers within an array. 
•	If there are no consecutive numbers in the array, the function will return zero.
•	If there are multiple instances of the same number of consecutive numbers in the array, the function will return the largest sum calculated between all instances.

•	Examples:
o	[1, 2, 3, 6, 9, 34, 2, 6] would return 6 (1+2+3)
o	[3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3] would return 27 (8+9+10)
o	[100, 101, 102, 3, 4, 5, 6, 9] would return 18 (3+4+5+6)


*/

console.log("snowy snowy")
console.log("-------------")




    // Input and variables
    var numberArray = [1, 2, 3, 6, 9, 34, 2, 6];
    // var numberArray = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3];
    // var numberArray = [100, 101, 102, 3, 4, 5, 6, 9] ;
    var difference = 1;
    var resultArray = [];


    // Processing
    for (var i = 0; i < numberArray.length; i++)
    {
        if(numberArray[i]+1 == numberArray[i+1] && numberArray[i+1]+1 == numberArray[i+2])
        {
            resultArray.push(numberArray[i])
            resultArray.push(numberArray[i+1])
            resultArray.push(numberArray[i+2])
        }

    }

    return resultArray;
    // Output




