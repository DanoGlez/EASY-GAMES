var wordList = ["none"];
let randomWord;
let guessedWord;
let failedAttempts = 0;
let maxAttempts = 15;
let gameFinished = false;

async function initializeGame() {
  await loadWordList('https://raw.githubusercontent.com/webpwnized/byepass/master/dictionaries/top-10000-spanish-words.txt');
  randomWord = getRandomWord();
  guessedWord = Array(randomWord.length).fill('_');
  displayWord();
  failedAttempts = 0;
  updateAttempts();
  document.getElementById('result').innerHTML = '';
  setupLetterButtons();
  gameFinished = false;
}

function loadWordList(url) {
  // fetch url (txt) and each line will be a word, skip the word is have some letter isn't on the abecedary
  return fetch(url)
    .then(response => response.text())
    .then(data => {
      wordList = data.split('\n').filter(word => {
        return word.split('').every(letter => {
          return 'abcdefghijklmnñopqrstuvwxyz'.includes(letter);
        });
      });
    }).catch(err => {
      console.error(err);
    });
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

function displayWord() {
  document.getElementById('word-display').innerHTML = guessedWord.join(' ');
}

function setupLetterButtons() {
  const letterTable = document.getElementById('letter-table');
  letterTable.innerHTML = ''; // Limpiar la tabla

  const alphabet = 'abcdefghijklmnñopqrstuvwxyz';
  let index = 0;

  for (let i = 0; i < 3; i++) {
    const row = letterTable.insertRow(i);
    for (let j = 0; j < 9; j++) {
      const cell = row.insertCell(j);
      const letter = alphabet[index];
      const button = document.createElement('button');
      button.textContent = letter.toUpperCase();
      button.onclick = function () {
        checkGuess(letter);
      };
      button.id = `btn-${letter}`;
      cell.appendChild(button);
      index++;
    }
  }
}

function checkGuess(guess) {
  if (gameFinished) return;

  const button = document.getElementById(`btn-${guess}`);
  button.disabled = true;

  if (randomWord.includes(guess)) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === guess) {
        guessedWord[i] = guess;
      }
    }
    displayWord();
    button.style.backgroundColor = "#2ecc71"; // Verde pastel
  } else {
    failedAttempts++;
    updateAttempts();
    button.style.backgroundColor = "#e74c3c"; // Rojo
  }

  if (guessedWord.join('') === randomWord) {
    document.getElementById('result').innerHTML = '¡Felicidades! ¡Adivinaste la palabra!';
    endGame();
  } else if (failedAttempts === maxAttempts) {
    document.getElementById('result').innerHTML = `¡Agotaste tus intentos! La palabra era "${randomWord}". ¡Mejor suerte la próxima vez!`;
    endGame();
  }
}

function updateAttempts() {
  document.getElementById('attempts').innerHTML = `Fallos restantes: ${maxAttempts - failedAttempts}`;
}

function endGame() {
  gameFinished = true;
  const letterButtons = document.querySelectorAll('button[id^="btn-"]');
  letterButtons.forEach(button => {
    button.disabled = true;
  });
}

function resetGame() {
  initializeGame();
}

// Inicializar el juego al cargar la página
initializeGame();