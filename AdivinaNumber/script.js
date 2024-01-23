let randomNumber;
let attempts = [];
let isGameOver = false;
let maxAttempts = 0;
let rankings = []; // Array para almacenar los rankings

function initializeGame() {
  document.getElementById('guess').disabled = false;
  document.getElementById('attempts-selector').disabled = false;
  document.getElementById('error').style.display = 'none';
  document.getElementById('crown').style.display = 'none';
  document.getElementById('attempts').innerHTML = '';
  document.getElementById('warning').innerHTML = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('history').innerHTML = '';
  document.getElementById('range').innerHTML = '';
  //document.getElementById('ranking').innerHTML = ''; // Limpiar el ranking al reiniciar
  attempts = [];
  isGameOver = false;
  maxAttempts = parseInt(document.getElementById('attempts-selector').value);
  randomNumber = Math.floor(Math.random() * 100) + 1;
  updateRange();
}
/*
function showRanking() {
  const sortedRankings = rankings.sort((a, b) => a.attempts - b.attempts);
  let rankingHTML = '<h2>Ranking:</h2><ol>';
  for (let i = 0; i < sortedRankings.length; i++) {
    rankingHTML += `<li>${sortedRankings[i].name}: ${sortedRankings[i].attempts} intentos</li>`;
  }
  rankingHTML += '</ol>';
  document.getElementById('ranking').innerHTML = rankingHTML;
}
*/
function checkGuess() {
  if (isGameOver) return;

  if (attempts.length === 0) maxAttempts = parseInt(document.getElementById('attempts-selector').value);

  const userGuess = parseInt(document.getElementById('guess').value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('crown').style.display = 'none';
    return;
  }

  if (attempts.includes(userGuess)) {
    alert("Ya intentaste ese número. ¡Intenta con otro!");
    return;
  }

  attempts.push(userGuess);

  if (userGuess === randomNumber) {
    document.getElementById('result').innerHTML = `¡Felicidades! ¡Adivinaste el número en ${attempts.length} intentos!`;
    document.getElementById('crown').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    isGameOver = true;
    updateRange();

    // Añadir el nombre del jugador para el ranking
    /*
    const playerName = prompt("¡Felicidades! ¡Adivinaste el número! Ingresa tu nombre para el ranking:");
    rankings.push({ name: playerName, attempts: attempts.length });
    */

    // Mostrar el ranking
    // showRanking();
  } else {
    const message = userGuess < randomNumber ? "Demasiado bajo." : "Demasiado alto.";
    document.getElementById('result').innerHTML = `Intenta de nuevo. ${message}`;
    document.getElementById('history').innerHTML = `Historial de intentos: ${attempts.join(', ')}`;
    document.getElementById('error').style.display = 'none';
    document.getElementById('crown').style.display = 'none';
    document.getElementById('attempts').innerHTML = `Intentos restantes: ${maxAttempts - attempts.length}`;
    updateRange();
  }

  if (maxAttempts - attempts.length === 1 && !isGameOver) {
    document.getElementById('warning').innerHTML = '¡Último intento!';
  }

  if (maxAttempts - attempts.length === 0 && !isGameOver) {
    document.getElementById('result').innerHTML = `¡Agotaste tus intentos! El número era ${randomNumber}. ¡Mejor suerte la próxima vez!`;
    document.getElementById('warning').innerHTML = '';
    document.getElementById('error').style.display = 'block';
    document.getElementById('crown').style.display = 'none';
    isGameOver = true;
    updateRange();
  }

  // Deshabilitar el campo de entrada después de adivinar
  if (isGameOver) {
    document.getElementById('guess').disabled = true;
    document.getElementById('attempts-selector').disabled = true;
  }
}

function resetGame() {
  initializeGame();
  document.getElementById('guess').value = '';
}

function updateAttempts() {
  maxAttempts = parseInt(document.getElementById('attempts-selector').value);
  document.getElementById('attempts').innerHTML = `Intentos restantes: ${maxAttempts - attempts.length}`;
}

function updateRange() {
  const targetNumber = randomNumber; // El número que se debe adivinar
  const closestBelow = Math.max(...attempts.filter(num => num < targetNumber), 0);
  const closestAbove = Math.min(...attempts.filter(num => num > targetNumber), 100);
  document.getElementById('range').innerHTML = `Rango: ${closestBelow} - ${closestAbove}`;
}

// Inicializar el juego al cargar la página
initializeGame();