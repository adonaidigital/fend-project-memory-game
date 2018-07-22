/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let cardToggled = [];
const deck = document.querySelector('.deck');

deck.addEventListener('click', function(event){
    const cTarget = event.target;
    if (cTarget.classList.contains('card') && cardToggled.length < 2) {
        toggleCd(cTarget);
        addCardToggle(cTarget);
        if (cardToggled.length === 2) {
         checkMatch();  
        }
    }
});

function toggleCd(card){
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addCardToggle(cTarget){
    cardToggled.push(cTarget);
    console.log(cardToggled);
}

function checkMatch(){
    if (
        cardToggled[0].firstElementChild.className === 
        cardToggled[1].firstElementChild.className
    ){
        cardToggled[0].classList.toggle('match');
        cardToggled[1].classList.toggle('match');
        cardToggled = [];
    } else {
        console.log('not a match');
        toggleCd(cardToggled[0]);
        toggleCd(cardToggled[1]);
        cardToggled = [];
    }
}
    