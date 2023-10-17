import aiPlayer from "./aiPlayer";
import Gameboard from "./gameboard";
import humanPlayer from "./humanPlayer";
import Ship from "./ship";

const gameLoop = () => {
  let humanGameboard;
  let aiGameboard;
  let human;
  let ai;

  const ships = [
    Ship(5, "carrier"),
    Ship(4, "battleship"),
    Ship(3, "destroyer"),
    Ship(3, "submarine"),
    Ship(2, "patrolboat"),
  ];

  const initializeGame = () => {
    humanGameboard = Gameboard();
    aiGameboard = Gameboard();
    human = humanPlayer();
    ai = aiPlayer();

    humanGameboard.placeRandomShips(humanGameboard, ships);
    aiGameboard.placeRandomShips(aiGameboard, ships);
  };

  const gameState = {
    currentPlayer: "human",
    isGameOver: false,
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

  return {
    initializeGame,
    getHumanGameboard,
    getAiGameboard,
    gameState,
    changeTurn,
    checkGameOver,
  };
};

export default gameLoop;
