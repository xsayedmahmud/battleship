import "./style.css";
import {
  adjustShipSizeAndPositions,
  removeDragAndDropEvents,
} from "./domModule";
import gameLoop from "./gameloop";
import missEffect from "./assets/miss.mp3";
import hitEffect from "./assets/hit.mp3";

const select = (selector) => document.querySelector(selector);
const create = (element) => document.createElement(element);
const updateContainerMargin = () => {
  const header = select("header");
  const game = select(".game");
  const headerHeight = header.offsetHeight;
  const gameWidth = game.offsetWidth;

  document.documentElement.style.setProperty(
    "--header-height",
    `${headerHeight}px`
  );

  document.documentElement.style.setProperty("--game-width", `${gameWidth}px`);
};

window.addEventListener("load", () => {
  updateContainerMargin();
  adjustShipSizeAndPositions();
});
window.addEventListener("resize", () => {
  updateContainerMargin();
  adjustShipSizeAndPositions();
});

const gameLog = JSON.parse(localStorage.getItem("gameLog")) || {
  humanWins: 0,
  aiWins: 0,
  lastWinner: null,
  totalGames: 0,
  updated: false,
};

const updateGameLog = () => {
  const humanLog = select(".humanLog");
  const aiLog = select(".aiLog");
  const lastRound = select(".lastRound");

  humanLog.textContent = `You: ${gameLog.humanWins}/${gameLog.totalGames}`;
  aiLog.textContent = `Ai: ${gameLog.aiWins}/${gameLog.totalGames}`;
  lastRound.textContent = gameLog.lastWinner
    ? `${gameLog.lastWinner} won the last round.`
    : "No games played yet.";
};

const gameInstances = gameLoop();
gameInstances.initializeGame();

const gameOverModal = select("#gameOverModal");
const winnerMessage = select("#winnerMessage");
const playAgainButton = select("#playAgain");
const closeBtn = select("#close-btn");
let soundOn = true;
const soundBtn = select(".sound");

soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.src = soundOn ? "./assets/sound-on.svg" : "./assets/sound-off.svg";
});

const playSound = (effect) => {
  if (soundOn) {
    const audio = new Audio(effect);
    audio.play();
  }
};

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const gameStateText = select(".gameMsg");

const updateGameState = () => {
  const humanGameBoard = gameInstances.getHumanGameboard();
  const aiGameBoard = gameInstances.getAiGameboard();
  const shipLog = select(".ship-log ol");

  let message = "";

  humanGameBoard.getShips().forEach((ship) => {
    if (
      ship.isSunk() &&
      !gameInstances.gameState.loggedShips.human.has(ship.name)
    ) {
      gameInstances.gameState.loggedShips.human.add(ship.name);
      const shipElement = select(`.human-ship.${ship.name}`);
      shipElement.classList.add("sink");

      select(".ship-log").style.display = "flex";
      const list = create("li");
      list.textContent = `AI sunk your ${capitalizeFirstLetter(ship.name)}`;
      shipLog.appendChild(list);
    }
  });

  aiGameBoard.getShips().forEach((ship) => {
    if (
      ship.isSunk() &&
      !gameInstances.gameState.loggedShips.ai.has(ship.name)
    ) {
      gameInstances.gameState.loggedShips.ai.add(ship.name);
      const shipElement = select(`.ai-ship.${ship.name}`);
      shipElement.classList.add("sink");

      select(".ship-log").style.display = "flex";
      const list = create("li");
      list.textContent = `You sunk Ai's ${capitalizeFirstLetter(ship.name)}`;
      shipLog.appendChild(list);
    }
  });

  if (!gameInstances.gameState.isGameOver) {
    message =
      gameInstances.gameState.currentPlayer === "human"
        ? "Your turn."
        : `AI's turn. Please wait!`;
  } else {
    let winner = null;
    if (humanGameBoard.isAllShipSunk()) {
      winner = "AI";
      gameLog.aiWins++;
      message = `Game over. AI wins!`;
    } else if (aiGameBoard.isAllShipSunk()) {
      winner = "You";
      gameLog.humanWins++;
      message = `Game over. You won!`;
    }

    gameLog.lastWinner = winner;
    gameLog.totalGames++;
    localStorage.setItem("gameLog", JSON.stringify(gameLog));
    updateGameLog();
    winnerMessage.textContent = message;
    gameOverModal.style.display = "block";
  }

  gameStateText.textContent = message;
};

const startGame = () => {
  const aiBoard = select(".ai .board");

  const humanTurn = (e) => {
    if (
      (e.target.classList.contains("cell") &&
        e.target.classList.contains("hit")) ||
      e.target.classList.contains("miss")
    ) {
      return;
    }
    if (e.target.classList.contains("cell")) {
      const [x, y] = e.target.dataset.pos.split(",").map(Number);
      gameInstances.getAiGameboard().receiveAttack([x, y]);
      const result = gameInstances.getAiGameboard().reportAttack([x, y]);
      playSound(result === "hit" ? hitEffect : missEffect);
      e.target.classList.add(result === "hit" ? "hit" : "miss");
      gameInstances.gameState.lastAttackResult = result;
      gameInstances.gameState.lastPlayer = "human";
      gameInstances.checkGameOver();
      gameInstances.changeTurn();
      updateGameState();
      aiBoard.removeEventListener("click", humanTurn);
      if (!gameInstances.gameState.isGameOver) {
        setTimeout(aiTurn, 200);
      }
    }
  };

  const aiTurn = () => {
    gameInstances.getAi().aiAttack(gameInstances.getHumanGameboard());
    const lastMove = gameInstances.getAi().getMoves().slice(-1)[0];
    const result = gameInstances.getHumanGameboard().reportAttack(lastMove);
    const attackedCell = select(`[data-pos = "${lastMove.join(",")}"]`);
    attackedCell.classList.add(result === "hit" ? "hit" : "miss");
    playSound(result === "hit" ? hitEffect : missEffect);
    gameInstances.gameState.lastAttackResult = result;
    gameInstances.gameState.lastPlayer = "ai";

    gameInstances.checkGameOver();
    gameInstances.changeTurn();
    updateGameState();
    if (!gameInstances.gameState.isGameOver) {
      aiBoard.addEventListener("click", humanTurn);
    }
  };

  if (!gameInstances.gameState.isGameOver) {
    if (gameInstances.gameState.currentPlayer === "human") {
      aiBoard.addEventListener("click", humanTurn);
    } else {
      setTimeout(aiTurn, 200);
    }
  } else {
    aiBoard.removeEventListener("click", humanTurn);
  }
};

const humanContainer = select(".human .game-container");
const aiContainer = select(".ai .game-container");

const randomizeButton = select(".randomize");
randomizeButton.addEventListener("click", () => {
  humanContainer.innerHTML = "";
  aiContainer.innerHTML = "";
  gameInstances.initializeGame();
});

const startButton = select(".start-reset");
startButton.addEventListener("click", () => {
  if (startButton.dataset.action === "start") {
    startButton.dataset.action = "reset";
    const boardDiv = select(".human .board");
    removeDragAndDropEvents(boardDiv);
    randomizeButton.disabled = true;
    startButton.textContent = "Reset";
    startGame();
  } else if (startButton.dataset.action === "reset") {
    startButton.dataset.action = "start";
    randomizeButton.disabled = false;
    startButton.textContent = "Start";
    humanContainer.innerHTML = "";
    aiContainer.innerHTML = "";
    const shipLog = select(".ship-log ol");
    shipLog.innerHTML = "";
    select(".ship-log").style.display = "none";
    gameStateText.textContent = "Arrange the ships.";
    gameInstances.initializeGame();
  }
});

playAgainButton.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  startButton.click();
});

closeBtn.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  startButton.click();
});

updateGameLog();
