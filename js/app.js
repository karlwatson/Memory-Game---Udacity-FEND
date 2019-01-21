const CARD_TYPES = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];


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
