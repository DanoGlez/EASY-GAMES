
function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
  
    document.getElementById('computer').textContent = computerChoice;
  
    const result = determineWinner(playerChoice, computerChoice);
  
    displayResult(result, computerChoice);
  }
  
  function determineWinner(player, computer) {
    if (player === computer) {
      return 'Empate';
    } else if ((player === 'rock' && computer === 'scissors') ||
               (player === 'paper' && computer === 'rock') ||
               (player === 'scissors' && computer === 'paper')) {
      return 'Ganaste';
    } else {
      return 'Perdiste';
    }
  }
  
  function displayResult(result, computerChoice) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Resultado: ${result}`;
  
    const computerElement = document.getElementById('computer');
    computerElement.textContent = `Elección de la computadora: ${computerChoice}`;
  }
  