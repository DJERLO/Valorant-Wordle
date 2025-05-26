let currentLetter = ''; // Variable to store the current letter entered

// Add an event listener to the document to detect keydown events
document.addEventListener('keydown', function(event) {
 
  const pressedKey = event.key; // Get the pressed key
  // Check if the pressed key is a lowercase letter from 'a' to 'z'
  if (/^[a-z]$/.test(pressedKey) && !gameEnded) {
    playDecide();
    currentLetter = pressedKey.toUpperCase(); // Convert to uppercase
    document.getElementById('guess').value = currentLetter; // Set the input field value to the current letter
  }
  
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    // If the Enter key is pressed, trigger the checkGuess function with the currentLetter
    if (currentLetter !== '') {
      checkGuess();
    }
  }
});