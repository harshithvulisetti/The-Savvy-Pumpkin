document.addEventListener('DOMContentLoaded', function() {
    const randomNumber = generateRandomNumber();
    const guessButton = document.getElementById('guess-button');
    const guessInput = document.getElementById('guess-input');
    const giveUpButton = document.getElementById('give-up-button');
    const resultText = document.getElementById('result-text');
    const attemptsList = document.getElementById('attempts-list');
    const congratsMessage = document.getElementById('congrats-message');
    let attempts = 0;
    const guessHistory = [];
  
    guessButton.addEventListener('click', function() {
      const guess = guessInput.value;
  
      if (validateGuess(guess)) {
        attempts++;
        const result = compareGuess(guess, randomNumber);
        guessHistory.push({ attempt: attempts, guess: guess, result: result });
        resultText.textContent = `Attempt ${attempts}: ${result}`;
  
        if (result === '4 Bulls! You win!') {
          congratsMessage.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
          disableGame();
        }
  
        renderGuessHistory();
      } else {
        alert('Invalid guess. Please enter a four-digit number.');
      }
  
      guessInput.value = '';
    });
  
    giveUpButton.addEventListener('click', function() {
      resultText.textContent = `The correct answer is ${randomNumber}`;
      disableGame();
    });
  
    function disableGame() {
      guessInput.disabled = true;
      guessButton.disabled = true;
      giveUpButton.disabled = true;
    }
  
    function renderGuessHistory() {
      attemptsList.innerHTML = '';
      guessHistory.forEach(function(guessItem) {
        const listItem = document.createElement('li');
        listItem.textContent = `Attempt ${guessItem.attempt}: ${guessItem.guess} - ${guessItem.result}`;
        attemptsList.appendChild(listItem);
      });
    }
  
    function generateRandomNumber() {
      const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let randomNumber = '';
  
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        randomNumber += digits.splice(randomIndex, 1)[0];
      }
  
      return randomNumber;
    }
  
    function validateGuess(guess) {
      return /^\d{4}$/.test(guess);
    }
  
    function compareGuess(guess, target) {
      let bulls = 0;
      let cows = 0;
  
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === target[i]) {
          bulls++;
        } else if (target.includes(guess[i])) {
          cows++;
        }
      }
      return `${bulls} Bull(s), ${cows} Cow(s)`;
    }
  });
  
  