var Result = { "win": 1, "loss": 2, "tie": 3 };

var PokerHand = function(hand) {
    this.hand = hand;
    this.breakdown = {
        'numberCount': Helper.numberCount(hand),
        'consecutiveNumbers': Helper.consecutiveNumbersCheck(hand),
        'sameSuits': Helper.sameSuitsCheck(hand),
        'highCardIndex': pokerSymbols.indexOf(Helper.getHighCard(hand))
    };
};


PokerHand.prototype.compareWith = function(hand) {

    // No parameter given in function
    if(hand === undefined) {
        console.log('Please compare to another hand');
    }

    const player1 = new PokerHand(this.hand);
    const player2 = hand;

    // Get index of result in ranks (lower score better)
    const p1Result = ranks.indexOf(Helper.getResult(player1));
    const p2Result = ranks.indexOf(Helper.getResult(player2));

    // If both players only have high card, compare cards
    if(p1Result === 9 && p2Result === 9) {
        if(player1.breakdown.highCardIndex > player2.breakdown.highCardIndex) {
            message = 'You are the Winner! High card';
            return Result.win;
        } else if(player1.breakdown.highCardIndex < player2.breakdown.highCardIndex) {
            message = 'You Lost, BetterLuck next Time';
            return Result.loss;
        } else {
            message = 'Its a Tie !!';
            return Result.tie
        }

    // Else compare ranks index (lower score wins)
    } else if(p1Result < p2Result) {
        message = 'You are the Winner!';
        return Result.win;
    } else if (p1Result > p2Result) {
        message = 'You Lost, BetterLuck next Time';
        return Result.loss;
    } else if (p1Result === p2Result) {
        message = 'Its a Tie !!';
        return Result.tie
    } else {
        message = "Error Occured Please try again";
        return;
    }
};




const pokerSymbols = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K',];

const ranks = [
    'Royal flush',
    'Straight flush',
    'Four of a kind',
    'Full house',
    'Flush',
    'Straight',
    'Three of a kind',
    'Two pairs',
    'Pair',
    'High card',
]

var Helper = {
    numberCount: (hand)  => {
        let cardDenoms = {};

        cardNumbers.getHandDenominations(hand.split(" ")).map(ele => {
            if (pokerSymbols.includes(ele)) {
                typeof cardDenoms[ele] === "undefined"
                    ? (cardDenoms[ele] = 1)
                    : cardDenoms[ele]++;
            }
        });
        return cardDenoms;
    },

    consecutiveNumbersCheck: (hand)  => {
        let indexes = [];
        let consecutiveNumbers = true;

        cardNumbers.getHandDenominations(hand.split(" ")).map(ele => {
            indexes.push(pokerSymbols.indexOf(ele));
        });

        const sortedIndexes = indexes.sort((a, b) => a - b);

        for (let i = 1; i < sortedIndexes.length; i++) {
            if (sortedIndexes[i - 1] != sortedIndexes[i] - 1) {
                consecutiveNumbers = false;
            }
        }
        return consecutiveNumbers;
    },

    sameSuitsCheck: (hand) => {
        const suitsInHand = cardNumbers.getHandSuits(hand.split(" "));
        const suit = suitsInHand.shift();
        let count = 0;

        suitsInHand.map(ele => {
            if (ele === suit) {
                count++;
            }
        });

        return count === 4 ? true : false;
    },
    getHighCard: (hand) => {
        let highIndex = 0;

        cardNumbers.getHandDenominations(hand.split(" ")).map(ele => {
            if (pokerSymbols.indexOf(ele) > highIndex) {
                highIndex = pokerSymbols.indexOf(ele);
            }
        });

        return pokerSymbols[highIndex];
    },
    getResult: (hand) => {
        const denoms = cardNumbers.getHandDenominations(hand.hand.split(" "));

        // Royal flush         A => 10 same suit
        if (
            denoms.includes("A") &&
            hand.breakdown.consecutiveNumbers &&
            hand.breakdown.sameSuits
        ) {
            return ranks[0];
        }

        // Straight flush      5 consecutive numbers same suit
        if (hand.breakdown.consecutiveNumbers && hand.breakdown.sameSuits) {
            return ranks[1];
        }

        // Four of a kind      Four cards the same
        let duplicates = [];

        for (const prop in hand.breakdown.numberCount) {
            if (hand.breakdown.numberCount[prop] === 4) {
                return ranks[2];
            } else {
                duplicates.push(hand.breakdown.numberCount[prop]);
            }
        }

        // Full house          3 cards same denomination + a pair
        if (
            (duplicates[0] === 3 && duplicates[1] === 2) ||
            (duplicates[1] === 3 && duplicates[0] === 2)
        ) {
            return ranks[3];
        }

        // Flush               5 cards same suit
        if (hand.breakdown.sameSuits) {
            return ranks[4];
        }

        // Straight            Any 5 cards in sequence
        if (hand.breakdown.consecutiveNumbers) {
            return ranks[5];
        }

        // Three of a kind     3 cards same denomination
        for (const prop in hand.breakdown.numberCount) {
            if (hand.breakdown.numberCount[prop] === 3) {
                return ranks[6];
            }
        }

        // Two pairs           2 sets of 2 cards same denomination
        // One Pair            2 cards same denomination
        let pairs = [];
        denoms.map((ele, i) => {
            if (denoms[i] === denoms[i + 1]) {
                pairs.push(denoms[i]);
            }
        });

        if (pairs.length === 2) {
            return ranks[7];
        } else if (pairs.length === 1) {
            return ranks[8];
        }

        // High card           Highest card if no other combination
        return ranks[9];
    }
};


/* HELPER FUNCTIONS */

var cardNumbers = {
    // Get card numbers contained in hand
getHandDenominations: (cards) => {
    return cards.map(ele => ele[0]).sort();
},

// Get suits contained in hand
getHandSuits: (cards) => {
    return cards.map(ele => ele[1]).sort();
}

}




/* UI LOGIC */

let message;
const submitBtn = document.getElementById('submit-btn');


submitBtn.addEventListener('click', () => { 

    let messageText = document.getElementById('message');
    let playerOneResult = document.getElementById('playerResult');
    let playerTwoResult = document.getElementById('oppoResult');   
    let playerOneHand, playerTwoHand, playerOneValue, playerTwoValue;

    playerOneValue = document.getElementById('player1').value.toUpperCase();
    playerTwoValue = document.getElementById('player2').value.toUpperCase();

    if (playerOneValue.length !== 0 && playerTwoValue.length !== 0) {
    playerOneHand = new PokerHand(playerOneValue);
    playerTwoHand = new PokerHand(playerTwoValue);

    playerOneResult.innerHTML = Helper.getResult(playerOneHand);
    playerTwoResult.innerHTML = Helper.getResult(playerTwoHand);

    playerOneHand.compareWith(playerTwoHand);

    messageText.innerHTML = message;
    } else {
            messageText.innerHTML = "Please enter valid Value";
    }

})