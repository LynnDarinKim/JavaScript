/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Assignment 1B Question 2
    Write a function in JavaScript that will return the sum of the longest streak of consecutive numbers within an array. 
•	If there are no consecutive numbers in the array, the function will return zero.
•	If there are multiple instances of the same number of consecutive numbers in the array, the function will return the largest sum calculated between all instances.
*/


function sumConsecutiveNumbers(numArray) 
{    
    // Input and variables

    var seqArray = [];

    var longSum = 0;
    var shortSum = 0;

    var shortSumArray = []
    var shortComparedResult = 0;

    var max = 0;

    var counter = 0;


    // Processing

    // go over the number array and find if consecutive numbers are there
    for (var i = 0; i < numArray.length; i++)
    {
        // the difference should be 1
        if(numArray[i]+1 === numArray[i+1] && numArray[i+1]+1 === numArray[i+2])
        {
            // count from the start number and push it in the sequence array. will use this to compare if the number is consecutive or not.  
            counter++;
            seqArray.push(counter);
        }

        else
        {
            // if the number is not a starting number of consecutive numbers, push zero so that the sequence array can have same index
            seqArray.push(0);
        }
    }

    // go over the array and find it the consecutive number is more than 3
    for(var a = 0; a < numArray.length; a++)
    {
        // if the difference between elements in sequence array is 1 and
        if(seqArray[a+1] - seqArray[a] === 1)
        {
            // if the sum of consecutive sequence element is more than 2, 
            // it means at least 4 numbers are consecutive 

            /*example 
            numArray = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3];
            seqArray = [0, 0, 0, 1, 0, 0, 0, 2, 0, 0,   0,  0, 3, 0, 0];
                                 1, *, *     2, *, *           3, *, *

            numArray [100, 101, 102, 3, 4, 5, 6, 9];
            seqArray [  1,   0,   0, 2, 3, 0, 0, 0];
                        1,   *,   *, 2, 3, *, *,     => when numbers in seqArray is consecutive, start from the number and 3 numbers should be added. 
            */
            if(seqArray[a] + seqArray[a+1] > 2)
            {
                longSum =numArray[a] + numArray[a+1] + numArray[a+2] + numArray[a+3]

                    break;
            }
        }

        // seperated numbers in sequence array means 3 consecutive numbers are there. 
        else if(seqArray[a] !== 0)
        {
            shortSum = numArray[a] + numArray[a+1]+ numArray[a+2];
            shortSumArray.push(shortSum)

                // if there's no longest streak, compare between numbers
                for(var i = 0; i < shortSumArray.length; i++)
                {
                    if(shortSumArray[i] >= shortComparedResult)
                    {
                        shortComparedResult = shortSumArray[i];
                    }
                }
        }
    }

    // get the maximum number in the sequence array. 
    // cited from Mozilla
    max = Math.max.apply(null, seqArray);

    // if the maximum number is equal to 0, it means no sequence number. so return 0
    if(max === 0)
    {
        return "0";
    }

    else if(longSum > 0 )
    {
        return longSum;
    }

    else if (longSum === 0 && shortComparedResult > 0)
    {
        return shortComparedResult;
    }
}

    // for example output

    // var numArray = [1, 9, 5, 9, 7];
    //return zero
    
    // var numArray = [1, 2, 3, 6, 9, 34, 2, 6]; 
    // return 6 (1+2+3)

    // var numArray = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3]; 
    // return 27 (8+9+10)
    
    var numArray = [100, 101, 102, 3, 4, 5, 6, 9] ; 
    // return 18 (3+4+5+6)

console.log(sumConsecutiveNumbers(numArray));
