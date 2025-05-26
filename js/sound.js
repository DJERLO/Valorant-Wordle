let decide = new Audio('js/audio/decision.mp3');
let wrong = new Audio("js/audio/wrong.mp3")
let success = new Audio('js/audio/success.mp3');
let fanfare = new Audio('js/audio/fanfare.mp3');
let gameover = new Audio('js/audio/gameover.mp3');

const playDecide = () => {
    decide.currentTime = 0; // Reset audio to the beginning
    decide.play();
}

const playCorrect = () => {
    success.currentTime = 0; // Reset audio to the beginning
    success.play();
}

const playWrong = () => {
    wrong.currentTime = 0; // Reset audio to the beginning
    wrong.play();
}

const playFanfare = () => {
    fanfare.currentTime = 0; // Reset audio to the beginning
    fanfare.play();
}

const playGameOver = () => {
    gameover.currentTime = 0; // Reset audio to the beginning
    gameover.play();
}