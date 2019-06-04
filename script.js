// Code goes here

//DOM variables 

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
let gameResult = document.getElementById('game-result');


//Card Variables 
let suits = ["Spades", "Hearts", "Clubs", "Daimonds"],
  values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
let i = 0,
  j = 0,
  k = 0;
//

//Game Variables

let playerCards = [],
  dealerCards = [],
  deck = [],
  noOfDecks = 5;
playerScore = 0,
  dealerScore = 0,
  dealerWins = 0;
playerWins = 0;
playerWon = false,
  gameOver = false,
  gameStarted = false;


hitButton.style.display = 'none';
stayButton.style.display = 'none';

showStatus();


newGameButton.addEventListener('click', function () {
  playerWon = false,
    gameOver = false,
    gameStarted = true;
  deck = createDeckOfCards();
  shuffleCards(deck);

  // Initializing the Cards Array for playing the new game
  playerCards = [];
  dealerCards = [];

  playerCards.push(getNextcard());
  dealerCards.push(getNextcard());
  playerCards.push(getNextcard());
  dealerCards.push(getNextcard());

  textArea.innerText = 'Game started...!';
  gameResult.innerText = '';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  newGameButton.style.display = 'none';

  showStatus();

  console.log(deck.length, deck);
  console.log(playerCards);
  console.log(dealerCards);
});

hitButton.addEventListener('click', function () {
  playerCards.push(getNextcard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function () {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeckOfCards() {
  let deck = [];
  let card = {};

  for (k = 0; k < noOfDecks; k++) {
    for (i = 0; i < suits.length; i++) {
      for (j = 0; j < values.length; j++) {
        card = {
          suit: suits[i],
          value: values[j]
        }
        deck.push(card);
      }
    }
  }
  return deck;
}

function shuffleCards(deck) {
  for (i = 0; i < deck.length; i++) {
    let swapIdex = Math.trunc(Math.random() * deck.length);
    let swapIdexValue = deck[swapIdex];
    deck[swapIdex] = deck[i];
    deck[i] = swapIdexValue;
  }
}

function checkForEndOfGame() {

  UpdateScores();

  if (gameOver) {
    //Let Dealer Take the cards 
    while ( playerScore <= 21 &&
      dealerScore < 17 ) {
      dealerCards.push(getNextcard());
      UpdateScores();
    }

  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }

  }

}

function getNextcard() {
  let cardNext = deck.shift();
  console.log(getCardObject(cardNext));
  return cardNext;
}

function getCardObject(card) {
  return card.value + ' of ' + card.suit;
}

function getNumericCard(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'One':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;

  }


}

function getScore(arr) {
  let score = 0;
  let hasAce = false;
  for (i = 0; i < arr.length; i++) {
    let card = arr[i];
    score += getNumericCard(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && (score + 10) <= 21) {
    return score + 10;
  }

  return score;
}

function UpdateScores() {
  playerScore = getScore(playerCards);
  dealerScore = getScore(dealerCards);
}

function showStatus() {

  if (!gameStarted) {
    textArea.innerText = 'Click new game for getting started...';
    return;
  }

  UpdateScores();


  let dealerString = '';
  for (i = 0; i < dealerCards.length; i++) {
    dealerString += '\n' + getCardObject(dealerCards[i]);
  }

  let playerString = '';
  for (i = 0; i < playerCards.length; i++) {
    playerString += '\n' + getCardObject(playerCards[i]);
  }

  textArea.innerText = '\n' +
    'Dealer has:' + dealerString + '\n' + '(Score:' + dealerScore + ')' + '\n\n' +
    'Player has:' + playerString + '\n' + '(Score:' + playerScore + ')';

  if (playerScore == 21) {
    playerWon = true;
    gameOver = true;
  } else if (dealerScore == 21) {
    playerWon = false;
    gameOver = true;
  } else if (playerScore == 21 && dealerScore == 21) {
    playerWon = false;
    gameOver = true;
  }

  if (gameOver) {
    if (playerWon) {
      gameResult.innerText = 'Player Won the Game';
      playerWins++;
    } else if ((dealerScore == 21 && playerScore == 21) || dealerScore==playerScore) {
      gameResult.innerText = 'Game is Tie';
    } else {
      gameResult.innerText = 'Dealer Won the Game';
      dealerWins++;
    }

    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    newGameButton.style.display = 'inline';
  }

}