let agents = [];

//UI contents
let menu = document.querySelector(".menuContainer");
let rules = document.querySelector(".rules-container");
let game = document.querySelector(".game-container");
let victoryScreen = document.querySelector(".splash-victory");
let gameOver = document.querySelector(".splash-game-over");
let agentWinIcon = document.getElementById('agent-win-icon');
let agentLoseIcon = document.getElementById('agent-lost-icon');

//UI Commands/Fucntions
let gameEnded = false;

// Function to load agents from the API
// This function fetches agents from the Valorant API and generates clues for each agent
async function loadAgentsFromAPI() {
  const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
  const data = await response.json();
  const agentData = data.data;

  agents = agentData.map(agent => ({
    agent: agent.displayName,
    displayIcon: agent.displayIconSmall,
    clues: generateClues(agent)
  }));
}

// Function to generate clues for each agent
function generateClues(agent) {
  // Generating clues based on abilities and role, but excluding the agent's name
  console.log(`Generating clues for agent: ${agent.displayName}`);
  if (!agent.abilities || agent.abilities.length === 0) {
    console.warn(`No abilities found for agent: ${agent.displayName}`);
    return ["No clues available for this agent."];
    
  }

  // Randomly pick an ability from the available ones
  const randomAbility = getRandomAbility(agent.abilities);

  // List of clues, including a random ability
  const clues = [
    `This character has the ability called '${randomAbility.displayName ?? 'Unknown'}'.`,
    `The agent plays the role of ${agent.role?.displayName ?? 'an unknown role'}.`,
    `This agent originates from ${agent.characterTags?.[0] ?? 'an unknown location'}.`
  ];

  // Shuffle the clues to randomize the order
  return shuffleArray(clues);
}

// Function to set the agent icon based on the selected agent
function setAgentIcon(agent) {
    agentWinIcon.src = agent; // Set the icon source
    agentLoseIcon.src = agent; // Set the icon source
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Helper function to pick a random ability from the available abilities
function getRandomAbility(abilities) {
  const randomIndex = Math.floor(Math.random() * abilities.length);
  return abilities[randomIndex]; // Return a random ability
}

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
  document.getElementById('clue').innerText = agents.find(agent => agent.agent.toUpperCase() === wordToGuess).clues[3 - attempts]
  gameEnded = false;

  // Enable the input field for guessing letters (For mobile devices)
  const input = document.getElementById("guess");
  input.disabled = false;
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
  if (agents.length === 0) {
    console.error("Agents not loaded yet.");
    return;
  }

  // Select a random agent from the agents array
  const randomAgent = agents[Math.floor(Math.random() * agents.length)];
  wordToGuess = randomAgent.agent.toUpperCase();
  
  // Set the agent icon based on the selected agent
  const characterIcon = randomAgent.displayIcon;
  setAgentIcon(characterIcon); // Set the agent icon for the game

  guessedLetters = [];
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
    // Check if the input is letter that already exists in the guessedLetters array
    if (guessedLetters.includes(guess)) {
      isLetterPicked.innerText = `You've already selected the letter '${guess}'`;
    } 
    
    // Check if the input is letter that not exists in the guessedLetters array
    if (!guessedLetters.includes(guess)) {
      guessedLetters.push(guess); // Add the guessed letter to the guessedLetters array
      displayWord(); // Display the updated word

      // If the guessed letter is wrong, decrement attempts and show a clue
      if (!wordToGuess.includes(guess) && attempts > 0) {
        attempts--; // Decrement attempts on a wrong guess
        document.getElementById('clue').innerText = agents.find(agent => agent.agent.toUpperCase() === wordToGuess).clues[3 - attempts]; // Display a clue
        document.getElementById('attempts').innerText = `Attempts Left: ${attempts}`; // Display remaining attempts
        
        // If attempts reach 0, show game over screen and the correct word and the character icon
        if (attempts === 0) {
          showGameOver();
          hideGamePanel();
          document.getElementById('result-game-over').innerText = `Game Over!\nThe agent we were looking for is: ${wordToGuess}`;
        }
        // Play Wrong Sound Effect (If the letter is not in the word of guess)
        else {
          playWrong();
        }

      } 
      
      if (checkWordGuess()) {
        hideGamePanel();
        showVictory();
        document.getElementById('result').innerText = 'You guessed the right agent! Well done!';
      }
      // Play Correct Sound Effect (If the letter is correct but the word is not fully guessed yet)  
      else {
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

document.addEventListener("DOMContentLoaded", () => {
  loadAgentsFromAPI();
});




