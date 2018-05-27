/*
 * Create a list that holds all of your cards
 */

const cards = [
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGame() {
  generateNewDeck();
}
initGame();

function generateNewDeck() {
  const shuffledCards = shuffle(cards);
  const deck = document.querySelector('.deck');

  deck.innerHTML = shuffledCards
    .map(card => {
      return generateCardHTML(card);
    })
    .join('');
}

function generateCardHTML(card) {
  const cardHTML = `<li class="card">
  <i class="fa ${card}"></i>
</li>`;
  return cardHTML;
}

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

let openCards = [];
let moves = 0;

document.querySelector('.deck').addEventListener('click', () => {
  checkCard();
});

function checkCard() {
  if (openCards.length !== 2) {
    if (
      event.target.classList.contains('card') &&
      openCards.length !== 2 &&
      !openCards.includes(event.target)
    ) {
      addOpenCard();
    }

    if (openCards.length === 2) {
      checkMatch();
      updateMoves();
    }
  }
}

function addOpenCard() {
  event.target.classList.toggle('open');
  event.target.classList.toggle('show');
  openCards.push(event.target);
}

function checkMatch() {
  if (
    openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className
  ) {
    showMatch();
  } else {
    setTimeout(function() {
      openCards[0].classList.toggle('open');
      openCards[0].classList.toggle('show');
      openCards[1].classList.toggle('open');
      openCards[1].classList.toggle('show');
      openCards = [];
    }, 1000);
  }
}

function showMatch() {
  openCards[0].classList.toggle('match');
  openCards[1].classList.toggle('match');
  setTimeout(function() {
    openCards = [];
  }, 1000);
}

function updateMoves() {
  moves++;
  document.querySelector('.moves').textContent = moves;
  updateStars();
}

function updateStars() {
  const twoStarScore = 16;
  const oneStarScore = 24;

  if (moves === twoStarScore) {
    removeStars(1);
  } else if (moves === oneStarScore) {
    removeStars(2);
  }
}

function removeStars(numStarsToRemove) {
  const stars = document.querySelectorAll('ul.stars li');
  for (let star = 0; star < numStarsToRemove; star++) {
    stars[star].style.display = 'none';
  }
}

document.querySelector('.restart').addEventListener('click', () => {
  resetGame();
  initGame();
});

function resetGame() {
  resetCards();
  resetMoves();
  resetStars();
}

function resetCards() {
  openCards = [];
  const cards = document.querySelectorAll('.deck li');
  cards.forEach(card => {
    card.classList = 'card';
  });
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').textContent = moves;
}

function resetStars() {
  const stars = document.querySelectorAll('ul.stars li');
  for (let star of stars) {
    star.style.display = 'inline';
  }
}
