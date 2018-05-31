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
  console.log(shuffledCards);
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
let stars = 3;
let matchedCards = 0;
let timerStarted = false;
let timerID;
let timeInSeconds = 0;
let minutes = '0';
let seconds = '00';

document.querySelector('.deck').addEventListener('click', () => {
  if (!timerStarted) {
    timerStarted = true;
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
  seconds =
    timeInSeconds % 60 < 10 ? '0' + timeInSeconds % 60 : timeInSeconds % 60;
  minutes = Math.floor(timeInSeconds / 60);
  clock.textContent = `${minutes}:${seconds}`;
}

function resetClock() {
  const clock = document.querySelector('.clock');
  clock.textContent = '0:00';
}

function checkCard() {
  const maxOpenCards = 2;
  if (openCards.length !== maxOpenCards) {
    if (
      event.target.classList.contains('card') &&
      openCards.length !== maxOpenCards &&
      !openCards.includes(event.target)
    ) {
      addOpenCard();
    }

    if (openCards.length === maxOpenCards) {
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
    addMatch();
  } else {
    resetOpenCards();
  }
}

function addMatch() {
  const totalMatches = 8;
  matchedCards++;

  for (let openCard of openCards) {
    openCard.classList.toggle('match');
  }
  if (matchedCards === totalMatches) {
    gameOver();
  } else {
    setTimeout(function() {
      openCards = [];
    }, 1000);
  }
}

function gameOver() {
  updateModalInfo();
  toggleModal();
}

function updateModalInfo() {
  const timeElapsed = document.getElementById('timeElapsed');
  const starScore = document.getElementById('starScore');
  const totalMoves = document.getElementById('totalMoves');

  timeElapsed.innerText = timeElapsed.innerText.concat(
    ` ${minutes}:${seconds}`
  );
  starScore.innerText = starScore.innerText.concat(` ${stars}`);
  totalMoves.innerText = totalMoves.innerText.concat(` ${moves}`);
}

gameOver();

function toggleModal() {
  document
    .querySelector('.modal__shadow')
    .classList.toggle('modal__shadow--hide');
}

function resetOpenCards() {
  setTimeout(function() {
    for (let openCard of openCards) {
      openCard.classList.toggle('open');
      openCard.classList.toggle('show');
    }
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

  if (moves === twoStarScore || moves === oneStarScore) {
    stars--;
    removeStars();
  }
}

function removeStars() {
  const starsList = document.querySelectorAll('ul.stars li');

  for (let star = 0; star < 3 - stars; star++) {
    starsList[star].style.display = 'none';
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
  clearTimeout(timerID);
  resetClock();
  timeInSeconds = 0;
  timerStarted = false;
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
