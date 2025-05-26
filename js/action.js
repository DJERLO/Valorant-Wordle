let currentLetter = ''; // Variable to store the current letter entered

// Event listener for keydown to capture letter input and display it uppercase
document.addEventListener('keydown', function(event) {
 
  const pressedKey = event.key; // Get the pressed key
  // Check if the pressed key is a lowercase letter from 'a' to 'z'
  if (/^[a-z]$/.test(pressedKey) || pressedKey === '/' && !gameEnded) {
    
    playDecide();
    currentLetter = pressedKey.toUpperCase(); // Convert to uppercase
    document.getElementById('guess').value = currentLetter; // Set the input field value to the current letter
  }
  
});

// Function For handling the input change event (for mobile users)
function handleOnchange(input) {
 
  const pressedKey = input; // Get the pressed key
  // Check if the pressed key is a lowercase letter from 'a' to 'z'
  if (/^[a-z]$/.test(pressedKey) || pressedKey === '/' && !gameEnded) {
    currentLetter = pressedKey.toUpperCase(); // Convert to uppercase
    document.getElementById('guess').value = currentLetter; // Set the input field value to the current letter
  }
  
};


// Event listener for the Enter key to submit the guess (with Physical Keyboard)
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    // If the Enter key is pressed, trigger the checkGuess function with the currentLetter
    if (currentLetter !== '') {
      checkGuess();
    }
  }
});

// Submit the guess when the button is clicked (for mobile users)
function submitGuess(event) {
  event.preventDefault(); // Prevent form from submitting normally
  if (currentLetter !== '') {
    checkGuess(); // Submit the guess logic
  }
}
