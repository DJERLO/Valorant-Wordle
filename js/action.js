let currentLetter = ''; // Variable to store the current letter entered
const inputField = document.getElementById('guess'); // Input field for the letter guess

// Event listener for keydown to capture letter input and display it uppercase
document.addEventListener('keydown', function(event) {
 
  const pressedKey = event.key; // Get the pressed key
  // Check if the pressed key is a lowercase letter from 'a' to 'z'
  if (/^[a-zA-Z]$/.test(pressedKey) || pressedKey === '/' && !gameEnded) {
    
    playDecide();
    currentLetter = pressedKey.toUpperCase(); // Convert to uppercase
    inputField.value = currentLetter; // Set the input field value to the current letter
  }
  
});

// Function For handling the input change event (for mobile users)
function handleOnchange(input) {
 
  const pressedKey = input; // Get the pressed key
  // Check if the pressed key is a lowercase letter from 'a' to 'z'
  if (/^[a-zA-Z]$/.test(pressedKey) || pressedKey === '/' && !gameEnded) {
    currentLetter = pressedKey.toUpperCase(); // Convert to uppercase
    inputField.value = currentLetter; // Set the input field value to the current letter
  }
  
};


// Event listener for the Enter key to submit the guess (with Physical Keyboard)
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    // If the Enter key is pressed, trigger the checkGuess function with the currentLetter
    const guestLetter = inputField.value; // Get the value from the input field
    const isInputValid = /^[a-zA-Z]$/.test(guestLetter); // Validate the input to ensure it's a single letter
    if (isInputValid && currentLetter !== '') {
      checkGuess();
    }
  }
});

// Submit the guess when the button is clicked (for mobile users)
function submitGuess(event) {
  event.preventDefault(); // Prevent form from submitting normally
  const guestLetter = inputField.value; // Get the value from the input field
  const isInputValid = /^[a-zA-Z]$/.test(guestLetter); // Validate the input to ensure it's a single letter

  // Check if the input is a valid letter and currentLetter is not empty
  if (isInputValid && currentLetter !== '') {
    checkGuess(); // Submit the guess logic
  }
}
