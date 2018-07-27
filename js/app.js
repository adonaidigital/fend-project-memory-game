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
let moves = 0;
scoreChecker();
let timerOff = true;
let time = 0;
timeDisplay();
let clockId;
statsData();
toggleStat();
let cardsMatched = 0; 


deck.addEventListener('click', function(event){
    const cTarget = event.target;
    if (cTarget.classList.contains('card') && 
            cardToggled.length < 2 && 
            !cardToggled.includes(cTarget)) {
        toggleCd(cTarget);
        addCardToggle(cTarget);
        if (cardToggled.length === 2) {
         checkMatch(cTarget);
         addMoves(); 
         scoreChecker();
        }
    }
    if (forValidClick(cTarget)){
        if(timerOff){
         timer();
         timerOff = false;
        }
      }
});

function forValidClick(cTarget){
    return(
        cTarget.classList.contains('card') && 
        !cTarget.classList.contains('match') && 
            cardToggled.length < 2 && 
            !cardToggled.includes(cTarget)
    );
}

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
        cardsMatched++;
    } else {
        setTimeout(function(){ 
        console.log('not a match');
        toggleCd(cardToggled[0]);
        toggleCd(cardToggled[1]);
        cardToggled = [];
    }, 500);
    }
}
function shuffleDeck() {
const cards2Shuffle = Array.from(document.querySelectorAll('.deck li'));
const shuffledCards = shuffle(cards2Shuffle);
for (card of shuffledCards){
    deck.appendChild(card);
  }
}
shuffleDeck(); 

function addMoves(){
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
function scoreChecker() {
    if(moves === 16 || moves === 24){
        keepStar();
    }
}
function keepStar() {
    const stars = document.querySelectorAll('.stars li');
    for (star of stars){
        if (star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }
    }
}
//keepStar();


function timer(){
        clockId = setInterval(function(){
        time++;
        timeDisplay();
        //console.log('time');
    },1000);
}
timer();

function stopTimer(){
    clearInterval(clockId);
}
//stopTimer();

function timeDisplay(){
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10){
    clock.innerHTML = `${minutes}:0${seconds}`
    }else{
    clock.innerHTML = `${minutes}:${seconds}`
    }
}
function toggleStat(){
    const stat = document.querySelector('.stat_background');
    stat.classList.toggle('hide');
}
toggleStat();
toggleStat();

function statsData(){
    const timeStat = document.querySelector('.statsTime');
    const timeNow = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.statMoves');
    const starsStat = document.querySelector('.statStars');
    const stars = addStar();
    timeStat.innerHTML = `Time = ${timeNow}`;
    movesStat.innerHTML =`Moves = ${moves}`;
    starsStat.innerHTML = `Stars= ${stars}`;
}

function addStar() {
    const stars = document.querySelectorAll('.stars li');
    countStar = 0;
    for (star of stars){
        if (star.style.display !== 'none'){
            countStar++;  
        }
    }
console.log(countStar);
return countStar;
}
let stopGame = document.querySelector('.stopGame');
stopGame.addEventListener('click', function(){
    toggleStat();
});

let startGame = document.querySelector('.startGame');
startGame.addEventListener('click', function(){
   console.log('replay');
});
let restart = document.querySelector('.restart');
// restart.addEventListener('click', gameReset);
// startGame.addEventListener('click', gameReset) it should be  inserted into *202

function gameReset(){
    clockAndTimeReset();
    movesReset();
    starsReset();
    shuffleDeck();
    }
    
function cardsReset(){
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards){
    card.className = 'card'; 
    }

}    

function clockAndTimeReset(){
            stopTimer();
            timerOff = true;
            time = 0;
            timeDisplay(); 
}
function movesReset() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function starsReset(){
    winStars = 0;
    const winStars = document.querySelectorAll('.stars li');
    for (star of winStars){
        star.style.display = 'inline';
    }
}
const totalPairs = 8;
if (cardsMatched === totalPairs){
    gameOver();
}
function gameOver(){
    stopTimer();
    statsData();
    toggleStat();
}