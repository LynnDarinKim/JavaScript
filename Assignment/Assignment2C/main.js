(function() { // IIFE to prevent the global pollution

    'use strict';

/*
    Author: Darin Kim
    Date: Feb. 11, 2019
    Description: Assignment 2C
    
    Overall Logic: 
    json data > get whole data as an object > extract cards data only and store in an array > count duplicated card values, count duplicated card suits and store those in each array > create each functions to check the result of 5 cards > call functions to determine the highest poker hand (from the highest to the lowest) > get the final hands on result > display using DOM

*/
    // create variable to use built-in methods in XMLHttpRequest()
    var xhr = new XMLHttpRequest();

    // create array to store parsed json information
    var infoObject;

    // use open method. get json from url and make it asynchronous with 'true' (can be omitted) 
    // request 5 random cards from the api
    // xhr.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=5', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/royalflush.json', true);
    xhr.open('GET', 'https://www.mikecaines.com/cards/straightflush.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/fourofakind.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/fullhouse.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/flush.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/highstraight.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/lowstraight.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/threeofakind.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/twopair.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/pair.json', true);
    // xhr.open('GET', 'https://www.mikecaines.com/cards/acehigh.json', true);

    // when server respond, check what kind of event is happening 
    xhr.onreadystatechange = function() {

        // if it is ready or not modified and the operation is complete,
        if( (xhr.status === 200 || xhr.status === 304) && xhr.readyState === 4 ) {

            // parse JSON into an object data
            infoObject = JSON.parse(xhr.responseText);

            // to check the object data
            console.log('data parsed from original json')
            console.log(infoObject)

            // extract cards array only from the object
            var cardArray = infoObject.cards;


            // TEST data with value and suit only (no image)

            // Number: 2 3 4 5 6 7 8 9 10
            // Human(?): JACK   QUEEN   KING    ACE
            // Suits: HEARTS  CLUBS  SPADES  DIAMONDS
            // cardArray[0].value = "7";
            // cardArray[0].suit = "HEARTS";

            // cardArray[1].value = "8";
            // cardArray[1].suit = "CLUBS";

            // cardArray[2].value = "9";
            // cardArray[2].suit = "HEARTS";

            // cardArray[3].value = "10";
            // cardArray[3].suit = "CLUBS";

            // cardArray[4].value = "JACK";
            // cardArray[4].suit = "HEARTS";


            // switch value for later use. (will be sorted in ascending order.)
            for(var i = 0; i < cardArray.length; i++) {
                if(cardArray[i].value == "ACE") {

                    cardArray[i].value = 0;

                    var inCaseOfLowStraight = ["A", "2", "3", "4", "5"];
                    
                    for(var j = 0; j < cardArray.length; j++) {
                        if (inCaseOfLowStraight.indexOf(cardArray[j].value) === -1) {
                            cardArray[i].value = 14;
                        }
                        else {
                            cardArray[i].value = 1;
                        }
                    }
                }
                else if(cardArray[i].value == "KING") {
                    cardArray[i].value = 13
                }
                else if(cardArray[i].value == "QUEEN") {
                    cardArray[i].value = 12
                }
                else if (cardArray[i].value =="JACK") {
                    cardArray[i].value = 11
                }
                else {
                    cardArray[i].value = parseInt(cardArray[i].value)
                }
            }


            // sort the cardArray by values in ascending order. 
            // it will make it easier to check the highest card and if the cards are consecutive
            // cite: http://www.javascriptkit.com/javatutors/arraysort2.shtml

            // ex. when comparing the value 3 and 10, the sort() method calls the compare function which is (a, b) and if 3-10 returns a negative value, 3 will be sorted as a value lower than 10. 
            cardArray.sort(function(a, b) {
                return a.value-b.value
            })

            
            // to store only values from the original card array.
            var cardValueArray = [];

            // to store only suits from the original card array.
            var cardSuitArray = [];

            for(var i = 0; i < cardArray.length; i++) {
                cardValueArray.push(cardArray[i].value);
                cardSuitArray.push(cardArray[i].suit)
            }

            // count duplicate values in an array and store as objects
            // cite: https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
            
            var duplicatedValueCount = {};

            // with forEach method, loop through the array
            cardValueArray.forEach(
                function(i) {
                    // if the value designated by the index exists, return the value of duplicatedValueCount[i]
                    // otherwise 0. 
                    // and then add one and keep looping 
                    duplicatedValueCount[i] = (duplicatedValueCount[i]||0) + 1;
                }
            );
            // to check the object
            console.log('duplicated value count object')
            console.log(duplicatedValueCount)

            // store values only from the value count object
            var duplicatedValueCountArray = Object.values(duplicatedValueCount);


            // count duplicated suits
            var duplicatedSuitCount = {};

            cardSuitArray.forEach(
                function(i) { 
                    duplicatedSuitCount[i] = (duplicatedSuitCount[i]||0) + 1;
                }
            );

            // store values only from the suit count object
            var duplicatedSuitArray = Object.values(duplicatedSuitCount)


            // to check stored data in each array
            console.log('card value array')
            console.log(cardValueArray) // the number of card value
            console.log('duplicated suits array')
            console.log(duplicatedSuitArray) // the number of duplicated suits
            console.log('duplicated value count array')
            console.log(duplicatedValueCountArray) // the number of duplicated values



            // Function that will determine the highest poker hand for the displayed cards

            // Royal Flush------------------------------------------
            function determineRoyalFlush(cardValueArray, duplicatedSuitArray) {

                var result = true;

                // value should be total 60 to become Royal Flush (10 + 11 + 12 + 13 + 14 = 60)
                var totalValue = 0;
                for(var i = 0; i < cardValueArray.length; i++) {
                    totalValue += cardValueArray[i];
                }

                // if the deck consist of all different cards && total value equals to 60 && dupliacted suits are 5
                if(cardValueArray.length == 5 && totalValue == 60 && duplicatedSuitArray[0] == 5) {
                    // return true
                    result = true;
                }
                else {
                    result = false;
                }

                return result;
            }


            // Straight Flush------------------------------------------
            function determineStraightFlush(cardValueArray, duplicatedSuitArray) {

                var result = true;
                
                // if the duplicated suits are 5
                if(duplicatedSuitArray[0] === 5) {
                    for(var i = 0; i < cardValueArray.length; i++) {

                        // check if the value is more than 1 and less than 11 (1 does not exist in the game and 11, 12, 13, 14 is JACK, QUEEN, KING and ACE each as I switched the value)
                        if (cardValueArray[i] > 1 && cardValueArray[i] < 11) {
                            
                            // if the numbers are consecutive and if the value of the first card and the last card is the same
                            if(cardValueArray[i]+1 !== cardValueArray[i+1] &&
                                cardValueArray[0]+4 == cardValueArray[4]) {

                                // should return true
                                result = true;
                            } else {result = false}

                        } else {result = false}

                    }

                } else {result = false}

                return result;
            }


            // Four of a Kind------------------------------------------
            function determineFourKind(duplicatedValueCountArray) {

                var result = true;

                // check the value of duplicate count array. the length should be 2 and either of values should be 4
                // ex. [1, 4] or [4, 1] -> 4 cards with the same values and the rest. 
                if(duplicatedValueCountArray.length === 2 && 
                    (duplicatedValueCountArray[0] === 4 || duplicatedValueCountArray[1] === 4)) {
                        result = true;
                    } else {
                        result = false;
                    }

                return result;
            }


            // Full House------------------------------------------
            function determineFullHouse(duplicatedValueCountArray) {

                var result = true;

                // duplicated value count array = [3, 2] or [2, 3]
                // 3 cards with same value, 2 same cards with same value
                for(var i = 0; i < duplicatedValueCountArray.length-1; i++) {
                    if((duplicatedValueCountArray[i] === 3 && duplicatedValueCountArray[i+1] === 2) ||
                        (duplicatedValueCountArray[i] === 2 && duplicatedValueCountArray[i+1] === 3) )
                    {
                        result = true;
                    }
                    else {result = false};
                }

                return result;
            }


            // Flush------------------------------------------
            function determineFlush(duplicatedSuitArray) {

                var result = true;

                // only check 5 same suits
                if(duplicatedSuitArray[0] === 5) {
                    result = true;
                } else {result = false}

                return result;
            }


            // Straight------------------------------------------
            function determineStraight(cardValueArray) {

                var result = true;

                // check consecutive numbers between 2~10

                    if(cardValueArray[0]+4 === cardValueArray[4]) {
                        result = true;

                        if( result == true) {
                            for(var j = 0; j < cardValueArray.length-1; j++) {
                                if(cardValueArray[j]+1 === cardValueArray[j+1]) {
                                    result = true;
                                    
                                }else {
                                    result = false
                                    break;}
                            }
                        }

                    } else {result = false;}


                return result;
            }


            // Three of a Kind------------------------------------------
            function determineThreeKind (duplicatedValueCountArray) {

                var result = true;

                // check how many numbers are duplicated. the number condition for three of card is 3
                // if the number 3 exists in the array of duplicated value count, return true.
                if(duplicatedValueCountArray.indexOf(3) !== -1) {
                    result = true;
                } else {
                    result = false;
                }

                return result;
            }


            // Two Pair------------------------------------------
            function determineTwoPair(duplicatedValueCountArray) {

                var result = true;

                // two pair will allow this count array to contain only [1,2,2] [2,1,2] [2,2,1] which is the length of 3
                // but not [3,1,1]. so check if index of 3 exists.  
                if(duplicatedValueCountArray.indexOf(3) == -1) {
                    if(duplicatedValueCountArray.length === 3) {
                        
                        result = true;

                    } else {result = false;}
                } else {result = false;}

                return result;
            }


            // Pair------------------------------------------
            function determinePair(duplicatedValueCountArray) {

                var result = true;

                if(duplicatedValueCountArray.length == 4) {
                // because two pair will allow this count array contain only 2,1,1,1 which is the length of 4
                    result = true;
                }
                else {
                    result = false;
                }

                return result;
            }

            // function to determine game result by calling all the functions above. 
            function determineGameResult(cardArray, cardValueArray, duplicatedSuitArray, duplicatedValueCountArray) {

                var gameResult = "";

                // store the hands order results
                var handsOrder = [
                "Royal Flush", "Straight Flush", "Four of Kind", "Full House", 
                "Flush", "Straight", "Three of Kind", "Double Pair", "Pair", "High Card"];

                if (determineRoyalFlush(cardValueArray, duplicatedSuitArray) === true) {
                    gameResult = handsOrder[0];
                }
                else if(determineStraightFlush(cardValueArray, duplicatedSuitArray) === true) {
                    gameResult = handsOrder[1];
                }
                else if (determineFourKind(duplicatedValueCountArray) === true) {
                    gameResult = handsOrder[2];
                }
                else if (determineFullHouse(duplicatedValueCountArray) === true) {
                    gameResult = handsOrder[3];
                }
                else if (determineFlush(duplicatedSuitArray) === true) {
                    gameResult = handsOrder[4];
                }
                else if (determineStraight(cardValueArray) === true) {
                    gameResult = handsOrder[5];
                }
                else if (determineThreeKind (duplicatedValueCountArray) === true) {
                    gameResult = handsOrder[6];
                }
                else if (determineTwoPair(duplicatedValueCountArray) === true) {
                    gameResult = handsOrder[7];
                }
                else if (determinePair(duplicatedValueCountArray) === true) {
                    gameResult = handsOrder[8];
                }
                else {
                    // display the highest card using ascending order. it should be the last card. 
                    gameResult = handsOrder[9] + " " +"<br>" + "[The highest card of" + " " + cardArray[4].code + "]";
                }

                return gameResult;
            }


            // get ID
            var targetElement1 = document.getElementById('card1')
            var targetElement2 = document.getElementById('card2')
            var targetElement3 = document.getElementById('card3')
            var targetElement4 = document.getElementById('card4')
            var targetElement5 = document.getElementById('card5')


            // display card image
            targetElement1.innerHTML = '<img src="' + cardArray[0].image + '">';
            targetElement2.innerHTML = '<img src="' + cardArray[1].image + '">';
            targetElement3.innerHTML = '<img src="' + cardArray[2].image + '">';
            targetElement4.innerHTML = '<img src="' + cardArray[3].image + '">';
            targetElement5.innerHTML = '<img src="' + cardArray[4].image + '">';


            // display card value and suits
            targetElement1.innerHTML += '<figcaption>' + cardArray[0].value + " " + cardArray[0].suit + '</figcaption>';
            targetElement2.innerHTML += '<figcaption>' + cardArray[1].value + " " + cardArray[1].suit + '</figcaption>';
            targetElement3.innerHTML += '<figcaption>' + cardArray[2].value + " " + cardArray[2].suit + '</figcaption>';
            targetElement4.innerHTML += '<figcaption>' + cardArray[3].value + " " + cardArray[3].suit + '</figcaption>';
            targetElement5.innerHTML += '<figcaption>' + cardArray[4].value + " " + cardArray[4].suit + '</figcaption>';


            // call function and display result
            var targetElementResult = document.getElementById('result');
            targetElementResult.innerHTML = '<p>' + 'Your result is ' + determineGameResult(cardArray, cardValueArray, duplicatedSuitArray, duplicatedValueCountArray) +'</p>'


        } 
    };

    // request to server
    xhr.send();

}) ();



