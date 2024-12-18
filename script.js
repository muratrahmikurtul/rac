const images = [
    "assets/raccoon1.png",
    "assets/raccoon2.png",
    "assets/raccoon3.png",
    "assets/raccoon4.png",
    "assets/raccoon1.png",
    "assets/raccoon2.png",
    "assets/raccoon3.png",
    "assets/raccoon4.png",
  ];
  
  let attempts = 0;
  let flippedCards = [];
  let matchedCards = [];
  
  const board = document.querySelector(".game-board");
  const attemptsCounter = document.getElementById("attempts");
  const winMessage = document.getElementById("win-message");
  const restartBtn = document.getElementById("restart-btn");
  
  // Function to Initialize Game
  function initializeGame() {
    // Reset variables
    board.innerHTML = "";
    flippedCards = [];
    matchedCards = [];
    attempts = 0;
    attemptsCounter.textContent = attempts;
    winMessage.classList.add("hidden");
  
    // Shuffle Images
    images.sort(() => Math.random() - 0.5);
  
    // Create Cards
    images.forEach((image, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">
            <img src="${image}" alt="Raccoon">
          </div>
        </div>
      `;
      board.appendChild(card);
  
      card.addEventListener("click", () => flipCard(card, index));
    });
  }
  
  function flipCard(card, index) {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;
  
    card.classList.add("flipped");
    flippedCards.push({ card, index });
  
    if (flippedCards.length === 2) {
      attempts++;
      attemptsCounter.textContent = attempts;
      checkMatch();
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
  
    if (images[card1.index] === images[card2.index]) {
      matchedCards.push(card1.index, card2.index);
      flippedCards = [];
  
      if (matchedCards.length === images.length) {
        winMessage.classList.remove("hidden");
      }
    } else {
      setTimeout(() => {
        card1.card.classList.remove("flipped");
        card2.card.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
  
  // Restart Game
  restartBtn.addEventListener("click", initializeGame);
  
  // Initialize on Page Load
  initializeGame();
  