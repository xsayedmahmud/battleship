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

  const isWithingDraggedShip = (
    x,
    y,
    startX,
    startY,
    endX,
    endY,
    orientation
  ) => {
    if (orientation === "horizontal") {
      return x === startX && y >= startY && y <= endY;
    }
    return y === startY && x >= startX && x <= endX;
  };

  const isValidRotation = (ship, [x, y], orientation) => {
    const shipLength = ship.length;
    const directions = [-1, 1];
    let validPositions = [];

    directions.some((direction) => {
      const tempPositions = [];
      for (let i = 0; i < shipLength; i++) {
        const newX = x + (orientation === "vertical" ? i * direction : 0);
        const newY = y + (orientation === "horizontal" ? i * direction : 0);

        if (
          newX >= 0 &&
          newX < 10 &&
          newY >= 0 &&
          newY < 10 &&
          (board[newX][newY] === null || board[newX][newY] === ship)
        ) {
          tempPositions.push([newX, newY]);
        } else {
          return false;
        }
      }

      const isValid = tempPositions.every(([newX, newY]) => {
        const surroundingCells = [
          [newX, newY + 1],
          [newX, newY - 1],
          [newX + 1, newY],
          [newX - 1, newY],
          [newX + 1, newY + 1],
          [newX + 1, newY - 1],
          [newX - 1, newY + 1],
          [newX - 1, newY - 1],
        ];

        return surroundingCells.every(
          ([sx, sy]) =>
            sx < 0 ||
            sx >= 10 ||
            sy < 0 ||
            sy >= 10 ||
            board[sx][sy] === null ||
            board[sx][sy] === ship
        );
      });

      if (isValid) {
        validPositions = tempPositions;
        return true;
      }
      return false;
    });

    return validPositions.length === shipLength ? validPositions : null;
  };

  const getCellsOfSunkShips = () => {
    const cellsOfSunkShips = [];
    shipSegments.forEach(([start, end], index) => {
      const ship = ships[index];

      if (ship.isSunk()) {
        const [startX, startY] = start;
        const [endX, endY] = end;
        const isHorizontal = startY !== endY;
        for (let i = 0; i < ship.length; i++) {
          const cell = isHorizontal
            ? [startX, startY + i]
            : [startX + i, startY];
          cellsOfSunkShips.push(cell);
        }
      }
    });
    return cellsOfSunkShips;
  };

  const isValidDragPlacement = (cellsArray, startPos, endPos, orientation) => {
    const [startX, startY] = startPos.split(",").map(Number);
    const [endX, endY] = endPos.split(",").map(Number);

    for (let i = 0; i < cellsArray.length; i++) {
      const [x, y] = cellsArray[i].split(",").map(Number);

      if (
        checkCell(x, y) &&
        !isWithingDraggedShip(x, y, startX, startY, endX, endY, orientation)
      ) {
        console.log("Invalid due to existing ship at", x, y);
        return false;
      }

      const surroundingCells = [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x - 1, y],
        [x + 1, y + 1],
        [x + 1, y - 1],
        [x - 1, y + 1],
        [x - 1, y - 1],
      ];

      for (let j = 0; j < surroundingCells.length; j++) {
        const [sx, sy] = surroundingCells[j];
        if (
          checkCell(sx, sy) &&
          !isWithingDraggedShip(sx, sy, startX, startY, endX, endY, orientation)
        ) {
          console.log("invalid due to proximity to another ship at", sx, sy);
          return false;
        }
      }
    }
    return true;
  };

  const placeShipDragAndDrop = (ship, [x, y], orientation) => {
    let endX = x;
    let endY = y;

    if (orientation === "horizontal") {
      endY = y + ship.length - 1;
      if (endY >= 10) return false;
    } else if (orientation === "vertical") {
      endX = x + ship.length - 1;
      if (endX >= 10) return false;
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === ship) {
          board[i][j] = null;
        }
      }
    }

    const shipIndex = ships.indexOf(ship);

    if (shipIndex > -1) {
      ships.splice(shipIndex, 1);
      shipSegments.splice(shipIndex, 1);
    }

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

    const shipImage = document.querySelector(`img[data-name="${ship.name}"]`);
    shipImage.dataset.startPos = `${x},${y}`;
    shipImage.dataset.endPos = `${endX},${endY}`;

    return ships.includes(ship);
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
    isValidDragPlacement,
    placeShipDragAndDrop,
    isValidRotation,
    getCellsOfSunkShips,
  };
};

export default Gameboard;
