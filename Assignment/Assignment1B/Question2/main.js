/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Write a function in JavaScript that will return the sum of the longest streak of consecutive numbers within an array. 
•	If there are no consecutive numbers in the array, the function will return zero.
•	If there are multiple instances of the same number of consecutive numbers in the array, the function will return the largest sum calculated between all instances.

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
    
    for (var i = 0; i < numArray.length; i++)
    {
        if(numArray[i]+1 == numArray[i+1] && numArray[i+1]+1 == numArray[i+2])
        {
            result = true;
            counter++;
            console.log(counter)

            seqArray.push(counter);
            
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



var diff = 1;

for(var c = 0; c < seqArray.length; c++)
{
    if(seqArray[c+1] - seqArray[c] == 1 || seqArray[c] - seqArray[c+1] == -1)
    {
        seqArray[c+1] = seqArray[c];
        seqArray[c+2] = seqArray[c]; 
        seqArray[c+3] = seqArray[c];
    }

    else
    {
        seqArray[c+1] = seqArray[c];
        seqArray[c+2] = seqArray[c];
    }

}

console.log(seqArray)
console.log("--work Debugger")

// var sum = 0;

// var sumArray = [];

// for(var a = 0; a < numseqArray.length; a++)
// {
//     for(var b = 0; b < numseqArray[a].length; b++)
//     {

//         if(numseqArray[1][b] !== 0 )
//         {
            
//             sum = numseqArray[0][b] + numseqArray[0][b+1]+ numseqArray[0][b+2];
            
//         }

//         if(numseqArray[1][b+1] - numseqArray[1][b] == 1)
//         {
//             sum =numseqArray[0][b] + numseqArray[0][b+1] + numseqArray[0][b+2] + numseqArray[0][b+3]
//         }



//         sumArray.push(sum)
//     }
// }

// console.log(sum)
// console.log(sumArray)

    // Output


