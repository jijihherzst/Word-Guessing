const guessInput = document.getElementById("guess");
const button = document.getElementById("submit");
const hintP = document.getElementById("hint");
const resultP = document.getElementById("result");
const restartbtn = document.getElementById("restart");
const words = [
  "apple",
  "banana",
  "orange",
  "mango",
  "grape",
  "peach",
  "kiwi",
  "cherry",
  "lemon",
  "melon",
  "papaya",
  "guava",
  "plum",
  "pear",
  "lychee",
];

let attempts = 0;
let maxAttempts = 5;
let toGuess = words.map((word) => word.toLowerCase());
let randomWord = toGuess[Math.floor(Math.random() * toGuess.length)];

function play() {
  toGuess = words.map((word) => word.toLowerCase());
  randomWord = toGuess[Math.floor(Math.random() * toGuess.length)];
  console.log(randomWord);
  attempts = 0;
  maxAttempts = 5;
  button.disabled = false;
  guessInput.disabled = false;

  hintP.textContent = `Hint: The word starts with '${randomWord[0]}'.`;
  resultP.textContent = "";
  resultP.classList.remove("correct-guess", "incorrect-guess");
}
play();
function checkGuess() {
  resultP.classList.remove("correct-guess", "incorrect-guess");
  const guesses = guessInput.value
    .split(",")
    .map((word) => word.trim().toLowerCase());
  for (let guess of guesses) {
    attempts++;
    if (guess === randomWord) {
      resultP.classList.add("correct-guess");
      resultP.textContent = `Congratulations! You guessed the secret word!.`;
      button.disabled = true;
      guessInput.disabled = true;
      break;
    } else if (attempts >= maxAttempts) {
      resultP.classList.add("incorrect-guess");
      resultP.textContent = `Game over! The secret word was '${randomWord}'.`;
      button.disabled = true;
      guessInput.disabled = true;
      break;
    } else {
      resultP.classList.add("incorrect-guess");
      resultP.textContent = `Incorrect guess. You have ${
        maxAttempts - attempts
      } attempts left. Try again!`;
    }
  }
  guessInput.value = "";
}

button.addEventListener("click", checkGuess);
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkGuess();
  }
});
restartbtn.addEventListener("click", () => {
  play();
});
