(function() {

    'use strict';

/*
    Author: Darin Kim
    Date: Feb. 11, 2019
    Description: Assignment 2C

*/

    var xhr = new XMLHttpRequest();

    // request 5 random cards from the api
    xhr.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=5', true);

    xhr.onreadystatechange = function() {
        if( (xhr.status === 200 || xhr.status === 304) && xhr.readyState === 4 ) {

            // parse JSON data and get as object
            var infoObject;
            infoObject = JSON.parse(xhr.responseText);

            // extract cards array from object data
            var cardArray = infoObject.cards;

            // to check the cardArray

            // store the results
            var handsOrder = [
                "Royal Flush", "Straight Flush", "Four of Kind", "Full House", 
                "Flush", "Straight", "Three of Kind", "Double Pair", "Pair", "High Card"];

                        //HEARTS  CLUBS  SPADES  DIAMONDS
                        // TEST data with value and suit only (no image)
                        cardArray[0].value = "1";
                        cardArray[0].suit = "CLUBS";

                        cardArray[1].value = "2";
                        cardArray[1].suit = "HEARTS";

                        cardArray[2].value = "2";
                        cardArray[2].suit = "HEARTS";

                        cardArray[3].value = "2";
                        cardArray[3].suit = "HEARTS";

                        cardArray[4].value = "7";
                        cardArray[4].suit = "HEARTS";


            // switch value for later use. (will be sorted in ascending order)
            for(var i = 0; i < cardArray.length; i++) {
                if(cardArray[i].value == "ACE") {
                    cardArray[i].value = "14"
                }
                else if(cardArray[i].value == "KING") {
                    cardArray[i].value = "13"
                }
                else if(cardArray[i].value == "QUEEN") {
                    cardArray[i].value = "12"
                }
                else if (cardArray[i].value =="JACK") {
                    cardArray[i].value = "11"
                }
                else {
                    cardArray[i].value = parseInt(cardArray[i].value)}
            }

            // sort the cardArray by values in ascending order to 
            // cite: http://www.javascriptkit.com/javatutors/arraysort2.shtml
            
            cardArray.sort(function(a, b) {
                return a.value-b.value
            })

            var cardValueArray = [];
            var cardSuitArray = [];

            for(var i = 0; i < cardArray.length; i++) {
                cardValueArray.push(cardArray[i].value);
                cardSuitArray.push(cardArray[i].suit)
            }

            // count duplicate values
            // cite: https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
            var duplicatedValueCount = {};
            cardValueArray.forEach(function(i) { duplicatedValueCount[i] = (duplicatedValueCount[i]||0) + 1;});

            var duplicatedValueCountArray = Object.values(duplicatedValueCount);

            // count duplicated suits
            var duplicatedSuitCount = {};
            cardSuitArray.forEach(function(i) { duplicatedSuitCount[i] = (duplicatedSuitCount[i]||0) + 1;});

            var duplicatedSuitArray = Object.values(duplicatedSuitCount)

            // to check stored data in each array
            console.log('card value array')
            console.log(cardValueArray) // the number of card value
            console.log('duplicated suits array')
            console.log(duplicatedSuitArray) // the number of duplicated suits
            console.log('duplicated value count array')
            console.log(duplicatedValueCountArray) // the number of duplicated values


            // Royal Flush------------------------------------------
            // calculate total number value

            function determineRoyalFlush(cardValueArray, duplicatedSuitArray) {

                var result = true;

                // value should be total 60 to become Royal Flush
                var totalValue = 0;
                for(var i = 0; i < cardValueArray.length; i++) {
                    totalValue += parseInt(cardValueArray[i])
                }

                // value should be total 60 to become Royal Flush
                if(cardValueArray.length == 5 && totalValue == 60 && duplicatedSuitArray[0] == 5) {
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
                
                if(duplicatedSuitArray[0] === 5) {

                    if(result = true)
                    {
                        for(var i = 0; i < cardValueArray.length; i++) {
                            if (cardValueArray[i] > 1 && cardValueArray[i] < 11) {
        
                                if(cardValueArray[0]+4 == cardValueArray[4])
                                {
                                    result = true;
                                } else {result = false}
        
                            }
                        }
                        for(var i = 0; i < cardValueArray.length-1; i++) {
                            if(cardValueArray[i]+1 !== cardValueArray[i+1]) {
                                result = false;
                            } 
                        }

                    }
                } else {
                    result = false
                }

                return result;
            }

            // Four of a Kind------------------------------------------
            function determineFourKind(duplicatedValueCountArray) {

                var result = true;

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

                if(duplicatedSuitArray[0] === 5) {
                    result = true;
                } else {result = false}

                return result;
            }


            // Straight------------------------------------------
            function determineStraight(cardValueArray) {

                var result = true;

                for(var i = 0; i < cardValueArray.length; i++) {
                    if(cardValueArray[i] > 1 && cardValueArray[i] < 11) {
                        if(cardValueArray[0]+4 === cardValueArray[4]) {
                            result = true;
                        } else {
                            result = false;
                        }
                    } else {
                        result = false;
                    }
                }

                return result;
            }


            // Three of a Kind------------------------------------------
            function determineThreeKind (duplicatedValueCountArray) {

                var result = true;

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

                if(duplicatedValueCountArray.indexOf(3) == -1) {
                    if(duplicatedValueCountArray.length === 3) 
                    // because two pair will allow this count array contain only 2,1,2 which is the length of 3
                    {
                        result = true;
                    } else {
                        result = false;
                    }
                } else {
                    result = false;
                }

                return result;
            }



            // if(duplicatedValueCountArray.length === 3) 
            // // because two pair will allow this count array contain only 2,1,2 which is the length of 3
            // // what if 3,1,1? 
            // {
            //     result = handsOrder[7]
            // }

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

            
            function determineGameResult(cardArray, cardValueArray, duplicatedSuitArray, duplicatedValueCountArray) {

                var gameResult = "";

                if (determineRoyalFlush(cardValueArray, duplicatedSuitArray) == true) {
                    gameResult = handsOrder[0];
                }
                else if(determineStraightFlush(cardValueArray, duplicatedSuitArray) == true) {
                    gameResult = handsOrder[1];
                }
                else if (determineFourKind(duplicatedValueCountArray) == true) {
                    gameResult = handsOrder[2];
                }
                else if (determineFullHouse(duplicatedValueCountArray) == true) {
                    gameResult = handsOrder[3];
                }
                else if (determineFlush(duplicatedSuitArray) == true) {
                    gameResult = handsOrder[4];
                }
                else if (determineStraight(cardValueArray) == true) {
                    gameResult = handsOrder[5];
                }
                else if (determineThreeKind (duplicatedValueCountArray) == true) {
                    gameResult = handsOrder[6];
                }
                else if (determineTwoPair(duplicatedValueCountArray) == true) {
                    gameResult = handsOrder[7];
                }
                else if (determinePair(duplicatedValueCountArray) == true) {
                    gameResult = handsOrder[8];
                }
                else {
                    gameResult = handsOrder[9] + " " + "The highest card of" + " " + cardArray[4].code;
                }

                return gameResult;
            }





            // UI
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


            // display result
            var targetElementResult = document.getElementById('result');
            targetElementResult.innerHTML = '<p>' + 'Your result:' + determineGameResult(cardArray, cardValueArray, duplicatedSuitArray, duplicatedValueCountArray) + '</p>'


        } 
    };

    // request to server
    xhr.send();

}) ()



