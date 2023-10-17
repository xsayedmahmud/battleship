const Gameboard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const attacks = Array(10)
    .fill(null)
    .map(() => Array(10).fill(false));

  const checkCell = (x, y) =>
    x >= 0 && x < 10 && y >= 0 && y < 10 ? board[x][y] : null;

  const isValidPlacement = (ship, [x, y], orientation) => {
    if (orientation === "horizontal" && y + ship.length > 10) return false;
    if (orientation === "vertical" && x + ship.length > 10) return false;

    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        if (checkCell(x, y + i)) return false;
        if (
          checkCell(x, y + i + 1) ||
          checkCell(x, y + i - 1) ||
          checkCell(x + 1, y + i) ||
          checkCell(x - 1, y + i) ||
          checkCell(x + 1, y + i + 1) ||
          checkCell(x + 1, y + i - 1) ||
          checkCell(x - 1, y + i + 1) ||
          checkCell(x - 1, y + i - 1)
        )
          return false;
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        if (checkCell(x + i, y)) return false;
        if (
          checkCell(x + i + 1, y) ||
          checkCell(x + i - 1, y) ||
          checkCell(x + i, y + 1) ||
          checkCell(x + i, y - 1) ||
          checkCell(x + i + 1, y + 1) ||
          checkCell(x + i + 1, y - 1) ||
          checkCell(x + i - 1, y + 1) ||
          checkCell(x + i - 1, y - 1)
        )
          return false;
      }
    }
    return true;
  };

  const ships = [];
  const shipSegments = [];

  const placeShip = (ship, [x, y], orientation) => {
    if (!isValidPlacement(ship, [x, y], orientation)) return false;
    let endX = x;
    let endY = y;

    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship;
      }
      endY = y + ship.length - 1;
    } else if (orientation === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = ship;
      }
      endX = x + ship.length - 1;
    }
    ships.push(ship);
    shipSegments.push([
      [x, y],
      [endX, endY],
    ]);
    return true;
  };

  const getRandomCoordinate = () => Math.floor(Math.random() * 10);
  const getRandomOrientation = () =>
    Math.random() > 0.5 ? "horizontal" : "vertical";

  const placeRandomShips = (gameboard, shipsArr) => {
    shipsArr.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const x = getRandomCoordinate();
        const y = getRandomCoordinate();
        const orientation = getRandomOrientation();

        placed = gameboard.placeShip(ship, [x, y], orientation);
      }
    });
  };

  const isShipSunkAt = ([x, y]) => {
    const ship = board[x][y];
    return ship ? ship.isSunk() : false;
  };

  const hitAttacks = [];
  const missedAttacks = [];
  const receiveAttack = ([x, y]) => {
    attacks[x][y] = true;
    if (board[x][y]) {
      board[x][y].hit();
      hitAttacks.push([x, y]);
    } else {
      missedAttacks.push([x, y]);
    }
  };

  const reportAttack = ([x, y]) => {
    if (board[x][y]) {
      return "hit";
    }
    return "miss";
  };

  const reset = () => {
    board.forEach((row) => row.fill(null));
    attacks.forEach((row) => row.fill(false));
    ships.length = 0;
    shipSegments.length = 0;
    hitAttacks.length = 0;
    missedAttacks.length = 0;
  };

  const isAllShipSunk = () => ships.every((ship) => ship.isSunk());
  const getMissedAttacks = () => missedAttacks;
  const getHitAttacks = () => hitAttacks;
  const getAttackAt = ([x, y]) => attacks[x][y];
  const getShipAt = ([x, y]) => board[x][y];
  const getShips = () => ships;
  const getShipSegments = () => shipSegments;

  return {
    placeShip,
    getShipAt,
    receiveAttack,
    getAttackAt,
    reportAttack,
    getMissedAttacks,
    getHitAttacks,
    isAllShipSunk,
    isShipSunkAt,
    reset,
    placeRandomShips,
    getShips,
    getShipSegments,
    isValidPlacement,
  };
};

export default Gameboard;
