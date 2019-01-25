/*
* PHONEWORDS
* Write a function that will take a phone word (vanity number) and return the correct telephone number.
* The number pad looks like the following:
* https://en.wikipedia.org/wiki/Telephone_keypad#/media/File:Telephone-keypad2.svg
*
* RULES
* Given a phoneword:
* 1. Ignore any non-alphanumeric characters (), -, etc.
* 2. Keep any digits
* 3. Resolve a letter to a number according to the keypad image
* 4. All your code must be contained in the section outlined below
*/


var buttons = ["abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"] //DO NOT MODIFY


// YOU CAN ADD TO AND MODIFY THE CODE BELOW THIS LINE
//   |
//   |
//   V

function convertPhoneWord(phoneWord) {



}

//    ^
//    |
//    |
//YOU CAN ADD TO OR MODIFY THE CODE ABOVE THIS LINE




// DO NOT CHANGE ANY CODE AFTER THIS LINE.
//     |
//     |
//     V

//helper functions...do not modify

function isNumeric(character) {
    return "0123456789".indexOf(character) !== -1;
}

function isLetter(character) {
    character = character.toUpperCase();    
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(character) !== -1;
}

function testCode() {
    console.assert(convertPhoneWord("1-800-HOLIDAY") === "18004654329", "Unable to convert 1-800-HOLIDAY");
    console.assert(convertPhoneWord("GIMMEPIZZA") === "4466374992", "Unable to convert GIMMEPIZZA");
    console.assert(convertPhoneWord("(902)Lottery") === "9025688379", "Unable to convert (902)Lottery");
    console.assert(convertPhoneWord("!@#$%^&") === "", "Error with non-alphanumeric.");
    console.assert(convertPhoneWord("") === "", "Error with empty string.");
    console.assert(convertPhoneWord(null) === "", "Error with null parameter.");
    console.assert(convertPhoneWord(undefined) === "", "Error with undefined parameter.");
}
testCode();