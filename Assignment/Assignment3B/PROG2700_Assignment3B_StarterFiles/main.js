/*
    Author: Darin Kim
    Date: Feb. 25, 2019
    Description: Assignment 3B
*/

//Choose an array method to implement for each of the incomplete functions.
//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

//Remember, you can chain together array function calls to attain your goals.
// Ex: array.filter().map()

//Get data for the TV Show "Friends"
fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json)

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));
        // use reduce. article tally second to last
        // https://medium.freecodecamp.org/reduce-f47a7da511a9

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json)); // return name and the summary only. 

    })

// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
// (or a combination) ON THE PROVIDED JSON DATA

// Define the required ten functions below this line...

// 1
var getGuntherCount = function(jsonInput) {

    // set regex pattern and check in the filter function 
    var pattern = /Gunther/;
    var numOfGunther  = jsonInput._embedded.episodes.map(x => x.summary).filter(function(str){return pattern.test(str)}).length;

    return numOfGunther

}

// 2
var getTotalRuntimeMinutes = function(jsonInput) {
    
    var runtime  = jsonInput.runtime;
    var runtimeLength = jsonInput._embedded.episodes.map(x => x.runtime).length; //count
    var totalRuntime = runtime * runtimeLength // calculate total

    return totalRuntime;
}

// 3
var getTotalEpisodesInYear = function(jsonInput, year) {

    // go over the airdate and filter with input year. get length of the array. 
    var numOfEpisode = jsonInput._embedded.episodes.map(x => x.airdate).filter(function(str){return str.includes(year)}).length;

    return numOfEpisode;
}

// 4
var getFemaleCastMembers = function(jsonInput) {

    // filter who's gender is Female and use map to get the person's name. 
    var nameOfFemaleCast = jsonInput._embedded.cast.filter(function(str){return str.person.gender === "Female"}).map(x => x.person.name)
        
    return nameOfFemaleCast;
}

// 5
var getEpisodeTitles = function(jsonInput, name) {

    // return summaries which value is not null and includes input name. and get the name from filtered objects array
    var episodeTitles = jsonInput._embedded.episodes.filter(function(str){
        return str.summary !== null && str.summary !== "" && str.summary.includes(name)}
        ).map(x=>x.name)
        
    return episodeTitles;
}

// 6
// cited: https://stackoverflow.com/questions/36867920/calculating-age-in-javascript-with-yyyy-mm-dd-format
var getCastMembersOver55 = function(jsonInput) {

    var MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
    function getAge(time){ // function to calculate an age
        var dateArray = time.split('-') // convert into an array
        var yearsElapsed = (new Date() - new Date(dateArray[0],dateArray[1],dateArray[2]))/(MILLISECONDS_IN_A_YEAR); // calculate distance
        return yearsElapsed; 
    }

    var castMembersOver55 = jsonInput._embedded.cast.filter(
        function(arr){ // call a function to get age
            return getAge(arr.person.birthday) > 55}).map(x => x.person.name)// get an array of objects filled with people over 55 and get their name

    return castMembersOver55;
}

// 7
var getTotalRuntimeMinutesExcludingSeasonSix = function(jsonInput) {

    var numOfEpisodeExcludingSeasonSix = jsonInput._embedded.episodes.filter(function(str){
        return str.season !== 6
    }).length; // calculate total number of season except for season 6
    var runtime = jsonInput.runtime; // get runtime
    var totalRuntimeMinutesExcludingSeasonSix = numOfEpisodeExcludingSeasonSix * runtime // calculate

    return totalRuntimeMinutesExcludingSeasonSix;
}

// 8 
var getFirstFourSeasons = function(jsonInput) {

    var firstFourSeasonNumberName = jsonInput._embedded.episodes.filter(function(str) {return str.season <= 4}).map(function(x) { return { number: x.number, name: x.name}}) // filter with season number and return num and name as objects

    // return an array of JSON objects containing the season number and episode name
    return firstFourSeasonNumberName
}

// 9
// cited: https://medium.freecodecamp.org/reduce-f47a7da511a9
var getEpisodeTallyBySeason = function(jsonInput) {

    var episodeTallyBySeason = jsonInput._embedded.episodes.map(x => [x.season]).reduce((tally, season) => {
        tally[season] = (tally[season] || 0) + 1; // start from 0 and add up from current value
        return tally;
    }, {}) // an empty obj as an initial value

    return episodeTallyBySeason;
}

// 10
// cited: https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings
var capitalizeTheFriends = function(jsonInput) {

    var mapObj = { // set to use with regex
        Monica : "MONICA",
        Joey: "JOEY",
        Chandler: "CHANDLER",
        Rachel: "RACHEL",
        Phoebe: "PHOEBE",
        Ross: "ROSS"
    }

    function replaceAll(str,mapObj){
        var re = new RegExp(Object.keys(mapObj).join("|"),"gi"); // matches all and find case insensitive match 
        if(str !== null) { // check if string is null 
            return str.replace(re, function(matched){ // if not, find the word matches with key in string
                return mapObj[matched]; // and replace to a value in mapObj
            });  
        }
    }

    var capitalizedFriendNameSummary = jsonInput._embedded.episodes.map(function(x) {
        return {name: replaceAll(x.name, mapObj), summary: replaceAll(x.summary, mapObj)}}) // call replace function and return as objects

    return capitalizedFriendNameSummary;
}