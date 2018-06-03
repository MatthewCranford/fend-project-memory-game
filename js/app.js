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

let openCards = [];
let moves = 0;
let stars = 3;
let matchedCards = 0;
let timerNotStarted = true;
let timerID;
let timeInSeconds = 0;
let minutes = '0';
let seconds = '00';

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
  let currentIndex = array.length,
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

document.querySelector('.deck').addEventListener('click', () => {
  if (timerNotStarted) {
    timerNotStarted = false;
    startTimer();
  }
  checkCard();
});

function startTimer() {
  function timer() {
    timeInSeconds++;
    displayTime();
    timerID = setTimeout(timer, 1000);
  }
  setTimeout(timer);
}

function displayTime() {
  const clock = document.querySelector('.clock');
  seconds = (timeInSeconds % 60 < 10
    ? '0' + timeInSeconds % 60
    : timeInSeconds % 60
  ).toString();
  minutes = Math.floor(timeInSeconds / 60).toString();
  clock.textContent = `${minutes}:${seconds}`;
}

function checkCard() {
  const MAX_OPEN_CARDS = 2;

  // Prevent cards being checked while timeout in progress
  if (openCards.length !== MAX_OPEN_CARDS) {
    if (
      event.target.classList.contains('card') &&
      !openCards.includes(event.target)
    ) {
      addOpenCard();
    }
    if (openCards.length === MAX_OPEN_CARDS) {
      updateMoves();
      checkMatch();
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
    addMatch();
  } else {
    resetOpenCards();
  }
}

function addMatch() {
  const TOTAL_MATCHES = 8;
  matchedCards++;

  for (let openCard of openCards) {
    openCard.classList.toggle('match');
  }
  if (matchedCards === TOTAL_MATCHES) {
    gameOver();
  } else {
    setTimeout(function() {
      openCards = [];
    }, 1000);
  }
}

function gameOver() {
  clearTimeout(timerID);
  updateScorecardText();
  toggleScorecard();
}
gameOver();
console.log(clearTimeout(timerID) === true);

function updateScorecardText() {
  const timeElapsed = document.getElementById('timeElapsed');
  const starScore = document.getElementById('starScore');
  const totalMoves = document.getElementById('totalMoves');

  timeElapsed.innerText = `Time elapsed = ${minutes}:${seconds}`;
  starScore.innerText = `Star score = ${stars}`;
  totalMoves.innerText = `Total moves = ${moves}`;
}

function toggleScorecard() {
  document
    .querySelector('.scorecard__shadow')
    .classList.toggle('scorecard__shadow--hide');
}

function resetOpenCards() {
  setTimeout(() => {
    for (let openCard of openCards) {
      openCard.classList.toggle('open');
      openCard.classList.toggle('show');
    }
    openCards = [];
  }, 1000);
}

function updateMoves() {
  moves++;
  document.querySelector('.moves').innerHTML = `Moves ${moves}`;
  updateStars();
}

function updateStars() {
  const twoStarScore = 16;
  const oneStarScore = 24;

  if (moves === twoStarScore || moves === oneStarScore) {
    stars--;
    hideStars();
  }
}

function hideStars() {
  const starsList = document.querySelectorAll('ul.stars li');
  const TOTAL_STARS = 3;
  const starsToHide = TOTAL_STARS - stars;

  for (let star = 0; star < starsToHide; star++) {
    starsList[star].style.display = 'none';
  }
}

document.querySelector('.restart').addEventListener('click', resetGame);

function resetGame() {
  if (
    !document
      .querySelector('.scorecard__shadow')
      .classList.contains('scorecard__shadow--hide')
  ) {
    toggleScorecard();
  }
  resetCards();
  resetMoves();
  resetStars();
  resetTime();
  initGame();
}

function resetCards() {
  openCards = [];
  matchedCards = 0;
  const cards = document.querySelectorAll('.deck li');
  for (card of cards) {
    card.classList = 'card';
  }
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = `Moves ${moves}`;
}

function resetStars() {
  stars = 3;
  const starsList = document.querySelectorAll('ul.stars li');
  for (let star of starsList) {
    star.style.display = 'inline';
  }
}

function resetTime() {
  clearTimeout(timerID);
  timerNotStarted = true;
  timeInSeconds = 0;
  const clock = document.querySelector('.clock');
  clock.textContent = '0:00';
}

document
  .getElementById('scorecard__exit')
  .addEventListener('click', toggleScorecard);
document
  .getElementById('scorecard__close')
  .addEventListener('click', toggleScorecard);
document
  .getElementById('scorecard__replay')
  .addEventListener('click', resetGame);
