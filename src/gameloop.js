import aiPlayer from "./aiPlayer";
import Gameboard from "./gameboard";
import Ship from "./ship";
import { renderBoard } from "./domModule";

const select = (selector) => document.querySelector(selector);

const gameLoop = () => {
  let humanGameboard;
  let aiGameboard;
  let ai;

  const humanContainer = select(".human .game-container");
  const aiContainer = select(".ai .game-container");

  const initializeGame = () => {
    humanGameboard = Gameboard();
    aiGameboard = Gameboard();
    ai = aiPlayer();
    const humanShips = [
      Ship(5, "carrier"),
      Ship(4, "battleship"),
      Ship(3, "destroyer"),
      Ship(3, "submarine"),
      Ship(2, "patrolboat"),
    ];

    const aiShips = [
      Ship(5, "carrier"),
      Ship(4, "battleship"),
      Ship(3, "destroyer"),
      Ship(3, "submarine"),
      Ship(2, "patrolboat"),
    ];

    humanGameboard.placeRandomShips(humanGameboard, humanShips);
    aiGameboard.placeRandomShips(aiGameboard, aiShips);

    renderBoard(humanContainer, aiContainer, humanGameboard, aiGameboard);
  };

  const gameState = {
    currentPlayer: "human",
    isGameOver: false,
    lastAttackResult: null,
    lastPlayer: null,
    loggedShips: {
      human: new Set(),
      ai: new Set(),
    },
  };

  const changeTurn = () => {
    gameState.currentPlayer =
      gameState.currentPlayer === "human" ? "ai" : "human";
  };

  const checkGameOver = () => {
    if (humanGameboard.isAllShipSunk() || aiGameboard.isAllShipSunk()) {
      gameState.isGameOver = true;
    }
  };

  const getHumanGameboard = () => humanGameboard;
  const getAiGameboard = () => aiGameboard;
  const getAi = () => ai;

  return {
    initializeGame,
    getHumanGameboard,
    getAiGameboard,
    gameState,
    changeTurn,
    checkGameOver,
    getAi,
  };
};

export default gameLoop;
