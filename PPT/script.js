
function playGame(playerChoice) {
    const choices = ['piedra', 'papel', 'tijeras'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
  
    document.getElementById('computer').textContent = computerChoice;
  
    const result = determineWinner(playerChoice, computerChoice);
  
    displayResult(result, computerChoice);
  }
  
  function determineWinner(player, computer) {
    if (player === computer) {
      return 'Empate';
    } else if ((player === 'piedra' && computer === 'tijeras') ||
               (player === 'papel' && computer === 'piedra') ||
               (player === 'tijeras' && computer === 'papel')) {
      return 'Ganaste';
    } else {
      return 'Perdiste';
    }
  }

  if(determineWinner === 'Ganaste'){ 
    //change color of the text
    
  }
  else if(determineWinner === 'Perdiste'){
  }
  else{
    
  }
  
  function displayResult(result, computerChoice) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Resultado: ${result}`;
  
    const computerElement = document.getElementById('computer');
    computerElement.textContent = `Elección de la IA: ${computerChoice}`;
  }
  