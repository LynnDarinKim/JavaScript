/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Write a function in JavaScript that will return the sum of the longest streak of consecutive numbers within an array. 
•	If there are no consecutive numbers in the array, the function will return zero.
•	If there are multiple instances of the same number of consecutive numbers in the array, the function will return the largest sum calculated between all instances.

*/

console.log("-------------")



    // Input and variables
    // var numArray = [1, 9, 5, 9, 7];
    //return zero
    
    // var numArray = [1, 2, 3, 6, 9, 34, 2, 6]; 
    // return 6 (1+2+3)

    // var numArray = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3]; 
    // return 27 (8+9+10)
    
    var numArray = [100, 101, 102, 3, 4, 5, 6, 9] ; 
    // return 18 (3+4+5+6)


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
            // console.log(counter)

            seqArray.push(counter);
            
        }
        else
        {
            result = false;
            // console.log("0")
            seqArray.push(0);
        }

    }
    
//     console.log("")
//     console.log(numArray)
// console.log(seqArray)

var numseqArray = [];

numseqArray.push(numArray);
numseqArray.push(seqArray);

// console.log(numseqArray);


var longSum = 0;
var shortSum = 0;

var longSumArray = []
var shortSumArray = []

var sumArray = [];

for(var a = 0; a < numseqArray.length; a++)
{
    for(var b = 0; b < numseqArray[a].length; b++)
    {

        // if(numseqArray[1][b+1] - numseqArray[1][b] < 1)
        // {
        //     console.log("zero")
        //     break;
        // }

        if(numseqArray[1][b+1] - numseqArray[1][b] == 1)
        {
            if(numseqArray[1][b] + numseqArray[1][b+1] > 2)
            {
                longSum =numseqArray[0][b] + numseqArray[0][b+1] + numseqArray[0][b+2] + numseqArray[0][b+3]

                break;
            }
        }

        if(numseqArray[1][b] !== 0 )
        {
            shortSum = numseqArray[0][b] + numseqArray[0][b+1]+ numseqArray[0][b+2];
            shortSumArray.push(shortSum)

            var ShortComparedResult = 0;
            for(var i = 0; i < shortSumArray.length; i++)
            {
                if(shortSumArray[i] >= ShortComparedResult)
                {
                    ShortComparedResult = shortSumArray[i];
                }
            }
        }
        
    }
}
console.log(longSum)
console.log(ShortComparedResult)

    // Output


