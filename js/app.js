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
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

let selectedCards = [];
let moves = 0;

document.querySelector('.deck').addEventListener('click', function(event) {
  if (selectedCards.length !== 2) {
    if (
      event.target.classList.contains('card') &&
      selectedCards.length !== 2 &&
      !selectedCards.includes(event.target)
    ) {
      event.target.classList.toggle('open');
      event.target.classList.toggle('show');
      selectedCards.push(event.target);
      console.log('selectedCards:', selectedCards);
    }

    if (selectedCards.length === 2) {
      checkMatch();

      updateMoves();
    }
  }
});

function updateMoves() {
  moves++;
  console.log(moves);
  console.log(document.querySelector('.moves'));
  document.querySelector('.moves').textContent = moves;
}

function checkMatch() {
  if (
    selectedCards[0].firstElementChild.className ===
    selectedCards[1].firstElementChild.className
  ) {
    console.log('match!');
    selectedCards[0].classList.toggle('match');
    selectedCards[1].classList.toggle('match');
    selectedCards = [];
  } else {
    console.log('better luck next time!');
    setTimeout(function() {
      selectedCards[0].classList.toggle('open');
      selectedCards[0].classList.toggle('show');
      selectedCards[1].classList.toggle('open');
      selectedCards[1].classList.toggle('show');
      selectedCards = [];
    }, 1000);
  }
}
