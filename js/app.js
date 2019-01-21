// Global constants & variables:
const CARD_TYPES = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];
const RESTART_BUTTON = $('.fa-repeat');
let isGameStarted = false;
let timeLapsed = 0;
let startTime = 0;
let endTime = 0;
let moveCounter = 0;
let matchedCounter = 0;
let openCards = [0, 0];
let eventStore = [0, 0];
let modal = $('.modal');
let closeBtn = $('.close');

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


//////////// Stars functionality:

// Removes one star (changes it to empty star)
function deleteStar() {
  let visibleStars = $('.fa-star');
  let lastVisibleStar = visibleStars[($('.fa-star').length)-1];
  lastVisibleStar.remove();
  let stars = $('.stars');
  stars.append('<li><i class="fa fa-star-o"></i></li>');
}

// Renews star counter to three stars (for Reset)
function renewStars() {
  $('.fa-star').remove();
  $('.fa-star-o').remove();
  let stars = $('.stars');
  stars.append('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
}


//////////// Move Counter functionality:

// Copy value stored in moveCounter variable
function updateMoveCounter()  {
  $('.moves').html(moveCounter);
}

// Called on completing a move to update counter AND manages stars
function incrementMoveCounter() {
  moveCounter++;
  updateMoveCounter();
  if ((moveCounter === 15) || (moveCounter === 22)) {
    deleteStar();
  }
}


//////////// Card functionality:

// Toggles Displaying a Card's Symbol
function displayCardSymbol(card)  {
  card.toggleClass('open show');
}

// Logic for clicking on a card - Event Listener
$('.deck').on('click', 'li.card', function(evt)  {

  let symbolName = $(evt.target).children().attr('class')

  if (!isGameStarted) {
    storeStartTime();
    isGameStarted = true;
  }

  if ( !($(this).attr('class').search('open') === -1) || !(openCards[1] === 0) ) {
    //exits if card already clicked on
    return true;

  } else {

    if (!(openCards[0]))  {
      //stores first card value if none currently stored
      openCards[0] = symbolName;
      displayCardSymbol($(this));
      eventStore[0] = $(this);
    } else {

      openCards[1] = symbolName;
      eventStore[1] = $(this);
      if (openCards[1] === openCards[0])  {
        //logic fo matching cards
        displayCardSymbol($(this));

        window.setTimeout(function() {
          eventStore[0].toggleClass('match')
          eventStore[1].toggleClass('match')
          openCards = [0, 0];
          // not strictly needed
          eventStore = [0, 0];
          incrementMoveCounter();

          matchedCounter++;
          if (matchedCounter === 8) {
            calculateTime();
            endOutput();
            openModal();
          }

        }, 400);

      } else {

        displayCardSymbol($(this));
        //logic for cards that do not match
        window.setTimeout(function() {
          displayCardSymbol(eventStore[1]);
          displayCardSymbol(eventStore[0]);
          openCards = [0, 0];
          // not strictly needed
          eventStore = [0, 0];
          incrementMoveCounter();
        }, 650);
        // openCards = [0, 0];
      }

    }
  }
});


//////////// Reset functionality:

// Resets page
function resetPage()  {
  clearAllCards();
  buildAllCards();
  moveCounter = 0;
  matchedCounter = 0;
  updateMoveCounter();
  renewStars();
  isGameStarted = false;
}

// Restart Button functionality - Event Listener
RESTART_BUTTON.on('click', function(evt)  {
  resetPage();
});

// Runs on Page load / refresh -  Event Listener
document.addEventListener('DOMContentLoaded', function () {
  resetPage();
});


// Modal functionality & Event Listener:

// Opens modal on game end
function openModal()  {
  $('.modal-text').append(endOutput());
  $('.modal').css('display', 'block');
}

// Close Modal event Listener
closeBtn.on('click', function(evt)  {
  $('.modal').css('display', 'none');
  resetPage();
});

// End game Logic:
function endOutput()  {
  let numberOfStars = ($('.fa-star').length);
  return ("Congratulations! \nYou completed the game in " + convertTime(timeLapsed) + ", & you got a " + numberOfStars + " star rating from " + moveCounter + " turns! \n Close to restart game. ");
}
