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
            var handsOrder = ["Royal Flush", "Straight Flush", "Four of Kind", "Full House", "Flush", "Straight", "Three of Kind", "Double Pair", "Pair", "High Card"];

                        //HEARTS  CLUBS  SPADES  DIAMONDS
                        // Four of a Kind Test / Full House / Straight / Three of a kind
                        cardArray[0].value = "10";
                        cardArray[0].suit = "HEARTS";
                        cardArray[1].value = "7";
                        cardArray[1].suit = "HEARTS";
                        cardArray[2].value = "7";
                        cardArray[2].suit = "HEARTS";
                        cardArray[3].value = "KING";
                        cardArray[3].suit = "HEARTS";
                        cardArray[4].value = "ACE";
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

            // var cardValueArray = Object.values(duplicatedValueCount);

            // count duplicated suits
            var duplicatedSuitCount = {};
            cardSuitArray.forEach(function(i) { duplicatedSuitCount[i] = (duplicatedSuitCount[i]||0) + 1;});

            var duplicatedSuitArray = Object.values(duplicatedSuitCount)

            var result = "";


            var totalValue = 0;
            for(var i = 0; i < cardValueArray.length; i++) {
                totalValue += parseInt(cardValueArray[i])
            }

            // Royal Flush------------------------------------------
            // calculate total number value


            // value should be total 60 to become Royal Flush
            var totalValue = 0;
            for(var i = 0; i < cardValueArray.length; i++) {
                totalValue += parseInt(cardValueArray[i])
            }
            cardValueArray

            if(cardValueArray)
            // value should be total 60 to become Royal Flush
            if(totalValue == 60) {
                if(duplicatedSuitArray[0] == 5) {
                    result = handsOrder[0]
                }
            }
            console.log(totalValue)
            console.log(cardArray)
            console.log(cardValueArray)
            console.log(cardSuitArray)
            console.log(duplicatedSuitArray)
            console.log(duplicatedSuitCount)
            console.log(duplicatedValueCount)
            console.log(cardValueArray)



            // Straight Flush------------------------------------------
            for(var i = 0; i < cardValueArray.length; i++) {
                if(cardValueArray[i] > 1 && cardValueArray[i] < 11) {
                    if(duplicatedSuitArray[0] === 5) {
                        if(cardValueArray[0]+4 === cardValueArray[4])
                        {
                            result = handsOrder[1]
                        }
                    }
                }
            }


            // Four of a Kind------------------------------------------
            var cardValueArray = Object.values(duplicatedValueCount);

            for(var i = 0; i < cardValueArray.length; i++) {
                if(cardValueArray[i] === 4)
                {
                    result = handsOrder[2]
                }
            }

            // Full House------------------------------------------
            var cardValueArray = Object.values(duplicatedValueCount);

            for(var i = 0; i < cardValueArray.length; i++) {
                if((cardValueArray[i] === 3 && cardValueArray[i+1] === 2) ||
                    (cardValueArray[i] === 2 && cardValueArray[i+1] === 3) )
                {
                    result = handsOrder[3]
                }
            }

            // Flush------------------------------------------
            if(duplicatedSuitCount === 5) {
                result = handsOrder[4]
            }

            // Straight------------------------------------------
            for(var i = 0; i < cardValueArray.length; i++) {
                if(cardValueArray[i] > 1 && cardValueArray[i] < 11) {
                    if(cardValueArray[0]+4 === cardValueArray[4])
                    {
                        result = handsOrder[5]
                    }
                }
            }

            // Three of a Kind------------------------------------------
            if(cardValueArray.indexOf(3) !== -1) {
                result = handsOrder[6]
            }

            // Two Pair------------------------------------------
            var cardValueArray = Object.values(duplicatedValueCount);
            if(cardValueArray.indexOf(3) == -1) {
                if(cardValueArray.length === 3) 
                // because two pair will allow this count array contain only 2,1,2 which is the length of 3
                {
                    result = handsOrder[7]
                }
            }


            // if(cardValueArray.length === 3) 
            // // because two pair will allow this count array contain only 2,1,2 which is the length of 3
            // // what if 3,1,1? 
            // {
            //     result = handsOrder[7]
            // }

            // Pair------------------------------------------
            var cardValueArray = Object.values(duplicatedValueCount);
            console.log(cardValueArray)
            if(cardValueArray.length > 3) 
            // because two pair will allow this count array contain only 2,1,2 which is the length of 3
            {
                result = handsOrder[8]
            }

            // High Card------------------------------------------
            var cardValueArray = Object.values(duplicatedValueCount);
            if(cardValueArray.length === 5 && totalValue !== 60) 
            {
                result = handsOrder[9] + " " + cardArray[4].code
                
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
            targetElementResult.innerHTML = '<p>' + 'Your result:' + result + '</p>'


        } 
    };

    // request to server
    xhr.send();

}) ()



