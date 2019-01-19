
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

console.log(durationResult.weeks)

// console.log(`There are ${} weeks, 3 days, 13 hours, 25 minutes, and 12 seconds until my next birthday!`)