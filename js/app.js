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

const shuffledCards = shuffle(cards);
console.log(shuffledCards);

document.querySelector('.deck').innerHTML = shuffledCards
  .map(card => {
    return generateCard(card);
  })
  .join('');

function generateCard(card) {
  const newCard = `<li class="card">
  <i class="fa ${card}"></i>
</li>`;
  return newCard;
}

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
    }

    if (selectedCards.length === 2) {
      checkMatch();
      updateMoves();
    }
  }
});

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

function checkMatch() {
  if (
    selectedCards[0].firstElementChild.className ===
    selectedCards[1].firstElementChild.className
  ) {
    selectedCards[0].classList.toggle('match');
    selectedCards[1].classList.toggle('match');
    selectedCards = [];
  } else {
    setTimeout(function() {
      selectedCards[0].classList.toggle('open');
      selectedCards[0].classList.toggle('show');
      selectedCards[1].classList.toggle('open');
      selectedCards[1].classList.toggle('show');
      selectedCards = [];
    }, 1000);
  }
}

document.querySelector('.restart').addEventListener('click', () => {
  resetGame();
});

function resetGame() {
  resetCards();
  resetMoves();
  resetStars();
}

function resetCards() {
  selectedCards = [];
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
