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
const totalPairs = 8;

deck.addEventListener('click', event => {
const cTarget = event.target;
if (forValidClick(cTarget)){
    if(timerOff){
        timerOn();
        timerOff = false;
    }
  }
});

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

const forValidClick = cTarget =>{
    return(
        cTarget.classList.contains('card') && 
        !cTarget.classList.contains('match') && 
            cardToggled.length < 2 && 
            !cardToggled.includes(cTarget)
    );
}

let toggleCd = card =>{
    card.classList.toggle('open');
    card.classList.toggle('show');
}

const addCardToggle = cTarget => {
    cardToggled.push(cTarget);
    console.log(cardToggled);
}

let checkMatch = () => {
    if (
        cardToggled[0].firstElementChild.className === 
        cardToggled[1].firstElementChild.className
    ){
        cardToggled[0].classList.toggle('match');
        cardToggled[1].classList.toggle('match');
        cardToggled = [];
        cardsMatched++;
        if (cardsMatched === totalPairs){
            gameOver();
            stopTimer();
        }
    } else {
        setTimeout(() =>{  //console.log('not a match');
        toggleCd(cardToggled[0]);
        toggleCd(cardToggled[1]);
        cardToggled = [];
    }, 800);
    }
}

let shuffleDeck = () =>{
const cards2Shuffle = Array.from(document.querySelectorAll('.deck li'));
const shuffledCards = shuffle(cards2Shuffle);
for (card of shuffledCards){
    deck.appendChild(card);
  }
}
shuffleDeck(); 

const addMoves = () =>{
    moves++;
    const movesMade = document.querySelector('.moves');
    movesMade.innerHTML = moves;
}

let scoreChecker = () =>{
    if(moves === 16 || moves === 24){
        keepStar();
    }
}

let keepStar =() =>{
    const stars = document.querySelectorAll('.stars li');
    for (star of stars){
        if (star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }
    }
}

const timerOn =() =>{
        clockId = setInterval(() =>{
        time++;
        timeDisplay();
    },1000);
}

const stopTimer =() =>{
    clearInterval(clockId);
}

let timeDisplay =() =>{
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10){
    clock.innerHTML = `${minutes}:0${seconds}`
    }else{
    clock.innerHTML = `${minutes}:${seconds}`
    }
}

let toggleStat =() =>{ // so this is the Modal function.
    const stat = document.querySelector('.stat_background');
    stat.classList.toggle('hide');
}//toggleStat();

let statsData =() =>{ // here are content of the modal 
    const timeStat = document.querySelector('.statsTime');
    const timeNow = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.statMoves');
    const starsStat = document.querySelector('.statStars');
    const stars = addStar();
    timeStat.innerHTML =`Time = ${timeNow}`;
    movesStat.innerHTML =`Moves = ${moves}`;
    starsStat.innerHTML =`Stars = ${stars}`;
}

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

let stopGame = document.querySelector('.stopGame');
stopGame.addEventListener('click', () =>{
toggleStat();
});
// This is to replay the game
let startGame = document.querySelector('.startGame');
startGame.addEventListener('click', replayGame);
 
//This is to reset the game to its default state.
let restart = document.querySelector('.restart');
restart.addEventListener('click', gameReset);

const gameReset =() =>{
    clockAndTimeReset();
    movesReset();
    starsReset();
    shuffleDeck();
    cardsReset();
    }
    
const cardsReset =() =>{
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards){
    card.className = 'card'; 
    card.classList.remove('open', 'show', 'match');
    }
}    

const clockAndTimeReset =() =>{
            stopTimer();
            timerOff = true;
            time = 0;
            timeDisplay(); 
}

const movesReset =() =>{
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

const starsReset =() =>{
    stars = 0;
    const winStars = document.querySelectorAll('.stars li');
    for (star of winStars){
        star.style.display = 'inline';
    }
}

let gameOver =() =>{
    stopTimer();
    statsData();
    toggleStat();
    cardsReset();
}

const replayGame =() =>{
    gameReset();
    toggleStat();
    cardToggled = []; 
}

  // Referenced Matthew Cranford Udacity Memory Game Walkthrough Part 1-8, live webinar walkthrough with Ryan Waite & Mike Wales, https://developer.mozilla.org 