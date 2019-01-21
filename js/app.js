// Global constants & variables:
const CARD_TYPES = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];
let isGameStarted = false;
let timeLapsed = 0;
let startTime = 0;
let endTime = 0;


//////////// Card functionality:

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

// Builds one card
function buildCard(cardType)  {
  let deck = $('.deck');
  deck.append(`<li class="card">
      <i class="fa ${cardType}"></i>
  </li>`);
}

// Fills the deck with all cards, after shuffling
function buildAllCards()  {
  let allCards = CARD_TYPES.concat(CARD_TYPES);
  let shuffledCards = shuffle(allCards);
  shuffledCards.forEach(buildCard);
}

// Empty Deck
function clearAllCards(cardType)  {
  let deck = $('.deck');
  deck.empty();
}


//////////// Timer functionality:

// uses the websites:
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
// https://www.w3schools.com/js/js_date_methods.asp
// https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/

// Show time: test output of different date / time variables: (to delete!!)
function callTime() {
  let d = new Date();
  let a = d.getTime();
  console.log('getTime():' + a);
  console.log('Date.now():' + Date.now())
}

// Stores start time (in ms)
function storeStartTime() {
  startTime = Date.now();
}

// Calculates end time from end and start time values
function calculateTime()  {
  endTime = Date.now();
  timeLapsed = (endTime - startTime);
}

// Convert time (stored in milliseconds) to a (human) readable format
function convertTime(millisec) {
   let seconds = (millisec / 1000).toFixed(2);
   let minutes = (millisec / (1000 * 60)).toFixed(1);
   let minutesRoundDown = Math.floor(minutes);
   let hours = (millisec / (1000 * 60 * 60)).toFixed(1);
   let hoursRoundDown = Math.floor(hours);

   if (seconds < 60) {
       return seconds + " Seconds";
   } else if (minutes < 60) {
       return minutesRoundDown + " Minutes and " + (seconds - (60 * minutesRoundDown)).toFixed(1) + "seconds";
   } else if (hours < 24) {
       return hoursRoundDown + " Hours, " + Math.floor(minutes - (60 * hoursRoundDown)) + " minutes";
   }
}

  
