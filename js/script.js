const agents = [
  {
    "agent": "Jett",
    "clues": [
      "The opponent used an ability that allows them to dash through the air.",
      "The opponent used an ultimate that rains down daggers from the sky.",
      "The opponent played aggressively, often engaging in close-quarters combat."
    ]
  },
  {
    "agent": "Sova",
    "clues": [
      "The opponent used an ability that sends out a drone that reveals enemy locations.",
      "The opponent used an ultimate that sends out a massive arrow that marks all enemies in its path.",
      "The opponent played cautiously, using their abilities to gather information before engaging."
    ]
  },
  {
    "agent": "Cypher",
    "clues": [
      "The opponent used an ability that traps enemies in a cage.",
      "The opponent used an ultimate that creates a zone where enemies cannot use their abilities.",
      "The opponent played defensively, using their abilities to control the battlefield and prevent enemies from advancing."
    ]
  },
  {
    "agent": "Raze",
    "clues": [
      "The opponent used an ability that launches a rocket that can damage multiple enemies.",
      "The opponent used an ultimate that deploys a boom bot that automatically seeks out and damages enemies.",
      "The opponent played aggressively, using their abilities to clear out enemy positions and push through defenses."
    ]
  },
  {
    "agent": "Omen",
    "clues": [
      "The opponent used an ability that allows them to teleport to a specific location.",
      "The opponent used an ultimate that sends out a wave that briefly teleports all enemies to a different location.",
      "The opponent played strategically, using their abilities to gain the upper hand in positioning and surprise their opponents."
    ]
  },
  {
    "agent": "Breach",
    "clues": [
      "The opponent used an ability that creates seismic disruptions, dazing and knocking up enemies.",
      "The opponent used an ultimate that sends out a powerful tremor, heavily dazing all enemies caught in its zone.",
      "The opponent played as an initiator, focusing on stunning enemies and creating opportunities for their team."
    ]
  },
  {
    "agent": "Brimstone",
    "clues": [
      "The opponent used an ability that calls down smoke screens, incendiary, and orbital strikes.",
      "The opponent used an ultimate that launches an orbital strike that deals damage to enemies caught in its area.",
      "The opponent played as a controller, manipulating the battlefield through area denial and smokes."
    ]
  },
  {
    "agent": "Viper",
    "clues": [
      "The opponent used an ability that emits a toxic gas cloud, reducing the health of enemies within.",
      "The opponent used an ultimate that emits a massive toxic cloud across the entire map.",
      "The opponent played as a controller, using poison to control the battlefield and create advantages."
    ]
  },
  {
    "agent": "Skye",
    "clues": [
      "The opponent used an ability that allows her to summon wildlife to assist her in battle.",
      "The opponent used an ultimate that calls upon a Seeker to seek out and nearsight enemies.",
      "The opponent played as an initiator and support, providing healing and gathering information."
    ]
  },
  {
    "agent": "Killjoy",
    "clues": [
      "The opponent used an ability that deploys various gadgets to control areas and protect her team.",
      "The opponent used an ultimate that detonates any deployed gadgets on the battlefield.",
      "The opponent played as a sentinel, focusing on defending and locking down areas."
    ]
  },
  {
    "agent": "Phoenix",
    "clues": [
      "The opponent used an ability that creates a wall of fire blocking vision.",
      "The opponent used an ultimate that resurrects him if he dies during its duration.",
      "The opponent played as a duelist, having self-sustain and dealing high damage."
    ]
  },
  {
    "agent": "Astra",
    "clues": [
      "The opponent used an ability that deploys stars to control the battlefield.",
      "The opponent used an ultimate that allows her to travel anywhere on the map and return to her star.",
      "The opponent played as a controller, manipulating gravity and cosmic energy to her advantage."
    ]
  }
]


//UI contents
let menu = document.querySelector(".menuContainer");
let rules = document.querySelector(".rules-container");
let game = document.querySelector(".game-container");
let victoryScreen = document.querySelector(".splash-victory");
let gameOver = document.querySelector(".splash-game-over");

//UI Commands/Fucntions
let gameEnded = false;

const showRules = () => {
  rules.style.display = "flex";
}

const hideRules = () => {
  rules.style.display = "none";
}

const showGameMenu = () => {
  menu.style.display = "flex"
}

const hideGameMenu = () => {
  menu.style.display = "none"
  selectRandomWord();
}

const showGamePanel = () => {
  game.style.display = 'flex';
  gameEnded = false;
}

const hideGamePanel = () => {
  game.style.display = 'none';
  gameEnded = true;
}

const showVictory = () => {
  playFanfare();
  victoryScreen.style.display = 'flex';
}

const hideVictory = () => {
  victoryScreen.style.display = 'none';
}

const showGameOver = () => {
  playGameOver();
  gameOver.style.display = 'flex';
}

const hideGameOver = () => {
  gameOver.style.display = 'none';
}


/*Game Behavior*/
let attempts = 3; // Initialize attempts
let letters = 0; //Default
let wordToGuess = ""; // Random word to be guessed by the user
let guessedLetters = []; // Player's guessed letters
let guessInput = document.getElementById('guess');

// Function to select a random word from agents array
function selectRandomWord() {
  const randomAgent = agents[Math.floor(Math.random() * agents.length)];
  wordToGuess = randomAgent.agent.toUpperCase();
  guessedLetters = []; // Reset guessed letters - just to make sure it resets
  letters = wordToGuess.length;
  document.getElementById("word-length").innerText = letters;
  showGamePanel();
  displayWord();
}

//selectRandomWord();

// Function to display the initial word with blanks
function displayWord() {
  let display = ""; // Initialize the display
  for (let letter of wordToGuess) {
    if (guessedLetters.includes(letter)) {
      display += letter + " "; // If the letter is guessed, display the letter
    } else {
      display += "_ "; // Otherwise, display a blank space
    }
  }
  document.getElementById('word').innerText = display;
}

// Function to check if the entire word has been guessed
function checkWordGuess() {
  let wordGuessed = true;

  for (let letter of wordToGuess) {
    if (!guessedLetters.includes(letter)) {
      wordGuessed = false;
      break;
    }
  }
  return wordGuessed;
}
document.getElementById('attempts').innerText = `Attempts Left: ${attempts}`;

function checkGuess() {
  let guess = guessInput.value.toUpperCase();
  let isLetterPicked = document.getElementById('already-selected');
  
  // Check if the input is not blank
  if (guess !== '') {
    if (guessedLetters.includes(guess)) {
      isLetterPicked.innerText = `You've already selected the letter '${guess}'`;
    } else {
      guessedLetters.push(guess); // Add the guessed letter to the guessedLetters array
      displayWord(); // Display the updated word

      if (!wordToGuess.includes(guess) && attempts > 0) {
        attempts--; // Decrement attempts on a wrong guess
        document.getElementById('clue').innerText = agents.find(agent => agent.agent.toUpperCase() === wordToGuess).clues[3 - attempts]; // Display a clue
        document.getElementById('attempts').innerText = `Attempts Left: ${attempts}`; // Display remaining attempts
        if (attempts === 0) {
          showGameOver();
          hideGamePanel();
          document.getElementById('result-game-over').innerText = `Game Over!\nThe agent we were looking for is: ${wordToGuess}`;
        } else {
          playWrong();
        }
      } else if (checkWordGuess()) {
        hideGamePanel();
        showVictory();
        document.getElementById('result').innerText = 'You guessed the right agent! Well done!';
      } else {
        playCorrect();
      }

      guessInput.value = ''; // Reset the input box
      isLetterPicked.innerText = ''; // Clear the alert message
    }
  }
}



// Function to reset the game state
function resetGame() {
  hideVictory(); //
  hideGameOver();
  guessedLetters = []; // Reset guessed letters completely
  attempts = 3; // Reset attempts to 3
  guessInput.value = ''; // Reset the input box
  document.getElementById('attempts').innerText = `Attempts Left: ${attempts}`;
  document.getElementById('clue').innerText = '';
  selectRandomWord(); // Select a new word
}



