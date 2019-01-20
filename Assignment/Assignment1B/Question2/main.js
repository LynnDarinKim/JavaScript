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

console.log("-------------")



    // Input and variables
    // var numArray = [1, 9, 5, 6, 7];
    // var numArray = [1, 2, 3, 6, 9, 34, 2, 6];
    // var numArray = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3];
    var numArray = [100, 101, 102, 3, 4, 5, 6, 9] ;


    // Processing

    var counter = 0;
    var result = false;

    var seqArray = [];
    
    // for (i = 0; i < numArray.length; i++)
    // {
    //     if(numArray[i] < numArray[i+1] && numArray[i + 1] < numArray[i+2])
    //     {   
    //         counter++;
    //         result = true;
    //         console.log(counter + "i have cons num")
    //     }
    //     else
    //     {
    //         result = false;
    //         console.log("no cons")

    //     }

    // }
    for (var i = 0; i < numArray.length; i++)
    {
        if(numArray[i]+1 == numArray[i+1] && numArray[i+1]+1 == numArray[i+2])
        {
            result = true;
            counter++;
            console.log(counter)

            seqArray.push(1);
            
        }
        else
        {
            result = false;
            console.log("0")
            seqArray.push(0);
        }

    }
    
    console.log("")
    console.log(numArray)
console.log(seqArray)

var numseqArray = [];

numseqArray.push(numArray);
numseqArray.push(seqArray);

console.log(numseqArray);


var sum = 0;

var sumArray = [];

for(var a = 0; a < numseqArray.length; a++)
{
    for(var b = 0; b < numseqArray[a].length; b++)
    {
        if(numseqArray[1][b] !== 0 )
        {
            sum = numseqArray[0][b] + numseqArray[0][b+1]+ numseqArray[0][b+2];
            
        }
        sumArray.push(sum)
    }
}

console.log(sum)
console.log(sumArray)

    // Output


