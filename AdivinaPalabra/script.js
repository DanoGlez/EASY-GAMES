let wordList = ["javascript", "programming", "developer", "html", "css", "challenge"];
let randomWord;
let guessedWord;
let failedAttempts = 0;
let maxAttempts = 6;

function initializeGame() {
  randomWord = getRandomWord();
  guessedWord = Array(randomWord.length).fill('_');
  displayWord();
  failedAttempts = 0;
  updateAttempts();
  document.getElementById('result').innerHTML = '';
  setupLetterButtons();
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

function displayWord() {
  document.getElementById('word-display').innerHTML = guessedWord.join(' ');
}

function setupLetterButtons() {
  const letterButtonsContainer = document.getElementById('letter-buttons');
  letterButtonsContainer.innerHTML = ''; // Limpiar los botones existentes

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i); // Convertir el código ASCII a letra minúscula
    const button = document.createElement('button');
    button.textContent = letter;
    button.onclick = function() {
      checkGuess(letter);
      button.disabled = true; // Desactivar el botón después de hacer clic
    };
    letterButtonsContainer.appendChild(button);
  }
}

function checkGuess(guess) {
  if (randomWord.includes(guess)) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === guess) {
        guessedWord[i] = guess;
      }
    }
    displayWord();
  } else {
    failedAttempts++;
    updateAttempts();
  }

  if (guessedWord.join('') === randomWord) {
    document.getElementById('result').innerHTML = '¡Felicidades! ¡Adivinaste la palabra!';
  } else if (failedAttempts === maxAttempts) {
    document.getElementById('result').innerHTML = `¡Agotaste tus intentos! La palabra era "${randomWord}". ¡Mejor suerte la próxima vez!`;
  }
}

function updateAttempts() {
  document.getElementById('attempts').innerHTML = `Fallos restantes: ${maxAttempts - failedAttempts}`;
}

function resetGame() {
  initializeGame();
}

// Inicializar el juego al cargar la página
initializeGame();