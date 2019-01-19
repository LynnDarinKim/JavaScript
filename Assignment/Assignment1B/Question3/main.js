/*
    Author: Darin Kim
    Date: Jan. 21, 2019
    Description: Write a JavaScript program to calculate the number of weeks, days, hours, minutes and seconds left until midnight on your birthday.

•	The script does not have to prompt for your birthdate. Simply assign it to a variable and start from there.
o	Ex: var myNextBirthday = …your code here
•	Expected sample output (console.log()):
o	There are 35 weeks, 3 days, 13 hours, 25 minutes, and 12 seconds until my next birthday!

*/

function calculateDuration()
{
    var countDownDate = new Date("November 28, 2019 00:00:00").getTime();
    var currentDateTime = new Date().getTime();
    
    var distance = countDownDate - currentDateTime;

    var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
        weeks : weeks,
        days : days,
        hours : hours,
        minutes : minutes,
        seconds : seconds
    }
}

var durationResult = calculateDuration();

console.log(`There are ${durationResult.weeks} weeks, ${durationResult.days} days, ${durationResult.hours} hours, ${durationResult.minutes} minutes, and ${durationResult.seconds} seconds until my next birthday!`)