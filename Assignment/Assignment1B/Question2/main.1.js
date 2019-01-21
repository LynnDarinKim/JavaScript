/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Write a function in JavaScript that will return the sum of the longest streak of consecutive numbers within an array. 
•	If there are no consecutive numbers in the array, the function will return zero.
•	If there are multiple instances of the same number of consecutive numbers in the array, the function will return the largest sum calculated between all instances.

*/

console.log("-------------")

    // Input and variables

    var numArray = [1, 9, 5, 9, 7];
    //return zero
    
    var numArray = [1, 2, 3, 6, 9, 34, 2, 6]; 
    // return 6 (1+2+3)

    var numArray = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3]; 
    // return 27 (8+9+10)
    
    var numArray = [100, 101, 102, 3, 4, 5, 6, 9] ; 
    // return 18 (3+4+5+6)



    // Processing

    var counter = 0;

    var seqArray = [];
    
    for (var i = 0; i < numArray.length; i++)
    {
        if(numArray[i]+1 == numArray[i+1] && numArray[i+1]+1 == numArray[i+2])
        {
            counter++;
            // console.log(counter)

            seqArray.push(counter);
            
        }
        else
        {
            // console.log("0")
            seqArray.push(0);
        }

    }

var longSum = 0;
var shortSum = 0;

var longSumArray = []
var shortSumArray = []

var sumArray = [];



var max = 0;
max = Math.max.apply(null, seqArray);



for(var a = 0; a < numArray.length; a++)
{


    if(seqArray[a+1] - seqArray[a] == 1)
    {
        if(seqArray[a] + seqArray[a+1] > 2)
        {
            longSum =numArray[a] + numArray[a+1] + numArray[a+2] + numArray[a+3]

                break;
        }
    }

    else if(seqArray[a] !==0)
    {
        shortSum = numArray[a] + numArray[a+1]+ numArray[a+2];
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

// console.log(longSum)
// console.log(ShortComparedResult)

if(max == 0)
{
    console.log("0");
}

if(longSum > 0 )
{
    console.log(longSum)
}

else if (longSum === 0 && ShortComparedResult > 0)
{
    console.log(ShortComparedResult)
}





    // Output


