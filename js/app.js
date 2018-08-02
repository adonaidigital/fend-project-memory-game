// Global variables 
let cardToggled = [];
const deck = document.querySelector('.deck');
let moves = 0;
let timerOff = true;
let time = 0;
let clockId;
let cardsMatched = 0; 
const totalPairs = 8;

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = array =>{
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

// This function shuffles the deck any time replay or restart button is clicked
let shuffleDeck = () =>{
    const cards2Shuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cards2Shuffle);
    for (card of shuffledCards){
        deck.appendChild(card);
      }
    }
    shuffleDeck();
/*
This function starts the timer 
as soon as there is a valid click. 
*/
deck.addEventListener('click', event => {
const cTarget = event.target;
if (forValidClick(cTarget)){
    if(timerOff){
        timerOn();
        timerOff = false;
    }
  }
});

/*
This function ensures that if a card is clicked twice 
the card wont be added to the toggled cards 
*/
deck.addEventListener('click', event => {
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
});
/* 
This function ensures that target is not more than 2 cards
and prevents matched cards from changing.
 */
const forValidClick = cTarget =>{
    return(
        cTarget.classList.contains('card') && 
        !cTarget.classList.contains('match') && 
            cardToggled.length < 2 && 
            !cardToggled.includes(cTarget)
    );
}

// This function flips the cards while playing the game 
let toggleCd = card =>{
    card.classList.toggle('open');
    card.classList.toggle('show');
}

//here is the function that pushes clicked card into cardToggled array
const addCardToggle = cTarget => {
    cardToggled.push(cTarget);
    //console.log(cardToggled);
}

//This function compares matched cards and stores them until all cards are matched.
let checkMatch = () => {
    if (cardToggled[0].firstElementChild.className === 
        cardToggled[1].firstElementChild.className)
    {
        cardToggled[0].classList.toggle('match');
        cardToggled[1].classList.toggle('match');
        cardToggled = [];
        cardsMatched++;
        if (cardsMatched === totalPairs){
            cardsReset();
            gameOver(); 
        }
        } else {
            setTimeout(() =>{  
            toggleCd(cardToggled[0]);
            toggleCd(cardToggled[1]);
            cardToggled = [];
        }, 800);
    }
} 
// This function handle the moves increment on the scoreboard
const addMoves = () =>{
    if (cardToggled.length === 2){
    moves++;
    let movesMade = document.querySelector('.moves');
    movesMade.innerHTML = moves;
    }
}
// This function compares the moves made with the number of stars to retain
scoreChecker = () => {
    if (moves === 18 || moves === 28){
        keepStar();
    }
}
//This function hides the stars 
let keepStar =() =>{
    const stars = document.querySelectorAll('.stars li');
    for (star of stars){
        if (star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }
    }
}

//This function starts the timer for the game
const timerOn =() =>{
        clockId = setInterval(() =>{
        time++;
        timeDisplay();
    },1000);
}

//This function stops the timer
const stopTimer =() =>{
    clearInterval(clockId);
}

//This is the function for showing the game's current time in the score panel
timeDisplay =() =>{
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10){
    clock.innerHTML = `${minutes}:0${seconds}`;
    }else{
    clock.innerHTML = `${minutes}:${seconds}`;
    }
}

// This is to toggle the Modal
toggleStat =() =>{ 
    const stat = document.querySelector('.stat_background');
    stat.classList.toggle('hide');
} 
//toggleStat();

// here is the modal function
statsData =() =>{  
    const timeStat = document.querySelector('.statsTime');
    const timeNow = document.querySelector('.clock').innerHTML;
    const starsStat = document.querySelector('.statStars');
    const stars = addStar();
    let movesMade = document.querySelector('.statMoves');
    timeStat.innerHTML = `Time = ${timeNow}`;
    starsStat.innerHTML = `Stars = ${stars}`;
    movesMade.innerHTML = `Moves = ${moves}`; 
}

// The function counts each stars that doesn’t have a display property of none
const addStar =() =>{
    const stars = document.querySelectorAll('.stars li');
    countStar = 0;
    for (star of stars){
        if (star.style.display !== 'none'){
            countStar++;  
        }
    }
return countStar;
}
//This is to reset the game to its default state.
const gameReset =() =>{
    clockAndTimeReset();
    movesReset();
    starsReset();
    shuffleDeck();
    cardsReset();
    }
let restart = document.querySelector('.restart');
restart.addEventListener('click', gameReset);

//This function is to reset the cards to default 
const cardsReset =() =>{
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards){
    card.className = 'card'; 
    }
    cardsMatched = [];
    cardToggled = [];
}    
//This function resets both the timer and clock
const clockAndTimeReset =() =>{
    stopTimer();
    timerOff = true;
    time = 0;
    timeDisplay(); 
}
//This function resets the moves
const movesReset =() =>{
    moves = 0;
    let movesMade = document.querySelector('.moves');
    movesMade.innerHTML = moves;
}
//This function resets the stars
const starsReset =() =>{
    stars = 0;
    const winStars = document.querySelectorAll('.stars li');
    for (star of winStars){
        star.style.display = 'inline';
        }
    }
//This function is triggered when all cards are matched. 
let gameOver =() =>{
    stopTimer();
    toggleStat();
    statsData();
}
// This function handles the game replay
const replayGame =() =>{
    gameReset();
    toggleStat();
}
let replay = document.querySelector('.replay');
    replay.addEventListener('click',replayGame);
/*
Referenced Matthew Cranford Udacity Memory Game Walkthrough Part 1-8, 
live webinar walkthrough with Ryan Waite & Mike Wales, 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
*/