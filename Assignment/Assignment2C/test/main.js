// Ready for Marking at 12:10PM 2/11/2019



var ajax;

var deckId;

var deck;

var dealtCard;

var cards;

var bubbleSortedCards;



ajax = new
XMLHttpRequest();



// Open shuffle page

ajax.open('GET',
'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
true);

ajax.send();



ajax.onreadystatechange =
function() {

if ((ajax.status ===
200 || ajax.status ===
304) && ajax.readyState ===
4) {


// HTTP responsed text JSON Parse

deck = JSON.parse(ajax.responseText);



// Store the deck ID

deckId = deck.deck_id;



// Get cards from the deck suffled

//ajax.open('GET', 'https://www.mikecaines.com/cards/royalflush.json', true);

//ajax.open('GET', 'https://www.mikecaines.com/cards/straightflush.json', true);

//ajax.open('GET', 'https://www.mikecaines.com/cards/fourofakind.json', true);

//ajax.open('GET', 'https://www.mikecaines.com/cards/fullhouse.json', true);

//ajax.open('GET', 'https://www.mikecaines.com/cards/flush.json', true);

//ajax.open('GET', 'https://www.mikecaines.com/cards/threeofakind.json', true);

//ajax.open('GET', 'https://www.mikecaines.com/cards/twopair.json', true);

//ajax.open('GET', 'https://www.mikecaines.com/cards/acehigh.json', true);

ajax.open('GET',
'https://www.mikecaines.com/cards/lowstraight.json',
true);

//ajax.open('GET', 'https://deckofcardsapi.com/api/deck/'+ deckId +'/draw/?count=5', true);

ajax.send();



ajax.onreadystatechange =
function() {

if ((ajax.status ===
200 || ajax.status ===
304) && ajax.readyState ===
4) {



// HTTP responsed text JSON parse for the received cards

dealtCard = JSON.parse(ajax.responseText);

console.log(dealtCard);



cards = dealtCard.cards;



// Road the card images

imgCall(cards);



// Bubblesort the dealt cards

bubbleSortedCards = 
bubbleSort(cards);



// Output the result

PokerGame(bubbleSortedCards);



}

}

}

}



// Switch the string cards to number cards

function stringToNumber(value) {

switch (value) {

case "ACE":

return 14;

case "KING":

return 13;

case "QUEEN":

return 12;

case "JACK":

return 11;

default: 

return parseInt(value);
// number cards return as just int numbers

}

}



// Bubble sort : organize numbers

function bubbleSort(myCards) {

var length =
myCards.length;

var i,
j, temp;

for (i =
0; i < 
length - 1; 
i++) { // 순차적으로 비교하기 위한 반복문

for (j =
0; j < 
length - 1 - 
i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문

if (stringToNumber(myCards[j].value) >
stringToNumber(myCards[j +
1].value)) {
// 두 수를 비교하여 앞 수가 뒷 수보다 크면

temp = myCards[j];
// 두 수를 서로 바꿔준다

myCards[j] =
myCards[j +
1];

myCards[j +
1] = temp;

}

}

}

console.log(myCards);

return myCards;

};



// Royal flush

function royalFlush(myCards) {

var check =
0;

var result =
false;



// if suit of the cards is the same, check will be increased

for (var
i = 0; 
i < myCards.length -
1; i++) {

if (myCards[i].suit ===
myCards[i+1].suit) {

check++;

}

}



// if all suit of the card is the same...

if (check ==
4) {

// and the first card and last card are 10 and ace...

if (myCards[0].value ==
10 && myCards[4].value ==
"ACE") {

// Royal flush!!

result = true;

} 

}

return result;

}



// Straight flush

function straightFlush(myCards) {

var result =
false;



// if suit of the cards is different, NO straight flush --> DONE

for (var
i = 0; 
i < myCards.length -
1; i++) {

if (myCards[i].suit !=
myCards[i+1].suit) {

result = false;

break;

}

else {

result = true;

}

}


// if all suit is the same

if (result ==
true) {

// if the cards aren't consecutive....

if (stringToNumber(myCards[0].value) +
4 != stringToNumber(myCards[4].value)) {

// NOT straight flush!!!

result = false;

}


}


return result;

}



// Four of a kind [0,1,2,3,4]

function fourOfAKind(myCards) {

var result =
false;

var temp =
0;



// Check if the numbers are consecutive

for (var
i = 0; 
i < myCards.length -
1; i++) {

if (myCards[i].value ===
myCards[i+1].value) {

// Increases number if they're consecutive

temp++;

}

}



// if cards are 3 times in a row?

if (temp ==
3) {

result = true;

// Four of a kind!!!!

}

else {

result = false;

}



return result;

}



// Full house

function fullHouse(myCards) {

var result =
false;

var temp =
0;


// if the first number and the second number are the same but not the same as the third number

if (myCards[0].value ==
myCards[1].value &&
myCards[2].value !=
myCards[1].value) {

// check if the third number to the fifth number are the same...???

for (var
i = 2; 
i < myCards.length -
1; i++) {

if (myCards[i].value ==
myCards[i+1].value) {

temp++; // it should be 2 if three numbers are the same in a row

}

}

}

// if temp is 2... full house!!!

if (temp ===
2) {

result = true;

}



// [0, 1, 2, 3, 4]

// if the first number to the third number are the same but not the same as the 4th number

if (myCards[0].value ==
myCards[1].value &&
myCards[1].value ==
myCards[2].value &&
myCards[2].value !=
myCards[3].value) {

// check if the 4th number and the last number are the same

// if true???????

if (myCards[3].value ==
myCards[4].value) {

// full house!!!!!!

result = true;

}

}



return result;

}



// Flush

function flush(myCards) {

var result =
false;



// check if suit of the cards are the same or not

for (var
i = 0; 
i < myCards.length -
1; i++) {

if (myCards[i].suit !=
myCards[i+1].suit) {

// if not the same, not flush

result = false;

break;

}

else {

// if all the same??? flush!!!

result = true;

}

}



return result;

}



// Straight

function straight(myCards) {

var result =
false;



// Check if the numbers are consecutive or not

if (stringToNumber(myCards[0].value) +
4 == stringToNumber(myCards[4].value)) {

// if consecutive, straight!!!!!!!

result = true;

}



if (stringToNumber(myCards[0].value) +
1 != stringToNumber(myCards[1].value)) {

result = false;

}



return result;

}



// Three of a kind

function threeOfAKind(myCards) {

var result =
false;



for (var
i = 0; 
i < myCards.length -
2; i++) {

// if there are the same three cards..........

if (stringToNumber(myCards[i].value) ===
stringToNumber(myCards[i+1].value) &&
stringToNumber(myCards[i+1].value) ===
stringToNumber(myCards[i+2].value)) {

// three of a kind!!!!

result = true;

}

}



return result;

}



// Two pair

function twoPair(myCards) {

var result =
false;

var temp =
0;

var diff =
0;



// if there is a pair of card, temp + 1

for (var
i = 0; 
i < myCards.length -
1; i++) {

if (stringToNumber(myCards[i].value) ===
stringToNumber(myCards[i+1].value)) {

temp++;

}

// if the next card has a different number, diff + 1

else {

diff++;

}

}



// For two pair, temp has to be 2 and diff has to be 2

if (temp ==
2 && diff ==
2) {

result = true;

}


return result;

}



// Pair

function pair(myCards) {

var result =
false;

var temp =
0;

var diff =
0;



// if there is a pair of card, temp + 1

for (var
i = 0; 
i < myCards.length -
1; i++) {

if (stringToNumber(myCards[i].value) ===
stringToNumber(myCards[i+1].value)) {

temp++;

}

// if the next card has a different number, diff + 1

else {

diff++;

}

}



// For one pair, temp has to be 1 and diff has to be 3

if (temp ==
1 && diff ==
3) {

result = true;

}



return result;

}



function PokerGame(myCards) {

var gameResult;

var output =
document.getElementById('result');



if (royalFlush(myCards)) {

gameResult = 
"Royal flush";

}

else if (straightFlush(myCards)) {

gameResult = 
"Straight flush";

}

else if (fourOfAKind(myCards)) {

gameResult = 
"Four of a kind";

}

else if (fullHouse(myCards)) {

gameResult = 
"Full house";

}

else if (flush(myCards)) {

gameResult = 
"Flush";

}

else if (straight(myCards)) {

gameResult = 
"Straight";

}

else if (threeOfAKind(myCards)) {

gameResult = 
"Three of a kind";

}

else if (twoPair(myCards)) {

gameResult = 
"Two pair";

}

else if (pair(myCards)) {

gameResult = 
"Pair";

}



else {

gameResult = 
`Your High card is ${myCards[4].value}`;

}



output.innerHTML =
"<h2> \""+
gameResult + "\"!!!</h2>";

}



function imgCall(myCards) {

var image1 =
document.getElementById('one');

var image2 =
document.getElementById('two');

var image3 =
document.getElementById('three');

var image4 =
document.getElementById('four');

var image5 =
document.getElementById('five');

image1.innerHTML =
"<img src = \""+
myCards[0].image+"\" >";

image2.innerHTML =
"<img src = \""+
myCards[1].image+"\" >";

image3.innerHTML =
"<img src = \""+
myCards[2].image+"\" >";

image4.innerHTML =
"<img src = \""+
myCards[3].image+"\" >";

image5.innerHTML =
"<img src = \""+
myCards[4].image+"\" >";

}