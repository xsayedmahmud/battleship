const aiPlayer = () => {
  const moves = [];
  let lastHits = [];
  let sinkMode = false;
  let shipOrientation = null;
  let lastDirection = null;
  let cellsToAvoid = [];

  const isCoordinatesInMoves = (x, y) =>
    moves.some(([moveX, moveY]) => moveX === x && moveY === y);

  const isCellsToAvoid = (x, y) =>
    cellsToAvoid.some(([avoidX, avoidY]) => avoidX === x && avoidY === y);

  const isValidCoordinates = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10;

  const getPotentialTargets = (
    lastX,
    lastY,
    shipOrientation,
    lastDirection
  ) => {
    let potentialTargets = [];
    if (shipOrientation) {
      if (shipOrientation === "horizontal") {
        potentialTargets =
          lastDirection === "right"
            ? [[lastX, lastY + 1]]
            : [[lastX, lastY - 1]];
      } else if (shipOrientation === "vertical") {
        potentialTargets =
          lastDirection === "down"
            ? [[lastX + 1, lastY]]
            : [[lastX - 1, lastY]];
      }
    } else {
      potentialTargets = [
        [lastX + 1, lastY],
        [lastX - 1, lastY],
        [lastX, lastY + 1],
        [lastX, lastY - 1],
      ];
    }
    return potentialTargets;
  };

  const generateRandomCoordinates = () => {
    let x;
    let y;

    if (moves.length >= 100)
      throw new Error("All possible coordinates are used up");

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      (x + y) % 2 !== 0 ||
      isCoordinatesInMoves(x, y) ||
      isCellsToAvoid(x, y)
    );

    return [x, y];
  };

  const generateTargetCoordinates = () => {
    if (!sinkMode && lastHits.length === 0) return generateRandomCoordinates();

    const [lastX, lastY] = lastHits[lastHits.length - 1];

    const potentialTargets = getPotentialTargets(
      lastX,
      lastY,
      shipOrientation,
      lastDirection
    );

    const target = potentialTargets.find(
      ([x, y]) =>
        isValidCoordinates(x, y) &&
        !isCoordinatesInMoves(x, y) &&
        !isCellsToAvoid(x, y)
    );

    if (sinkMode && !target) {
      const [newLastX, newLastY] = lastHits[0];
      switch (lastDirection) {
        case "right":
          lastDirection = "left";
          break;
        case "left":
          lastDirection = "right";
          break;
        case "down":
          lastDirection = "up";
          break;
        case "up":
          lastDirection = "down";
          break;
        default:
          console.warn(`Unexpected value for lastDirection: ${lastDirection}`);
          break;
      }

      const potentialTargetsOpposite = getPotentialTargets(
        newLastX,
        newLastY,
        shipOrientation,
        lastDirection
      );

      const targetOpposite = potentialTargetsOpposite.find(
        ([x, y]) =>
          isValidCoordinates(x, y) &&
          !isCoordinatesInMoves(x, y) &&
          !isCellsToAvoid(x, y)
      );

      if (targetOpposite) {
        lastHits.unshift(targetOpposite);
      }

      return targetOpposite || generateRandomCoordinates();
    }

    return target || generateRandomCoordinates();
  };

  const aiAttack = (gameboard) => {
    const coordinates = generateTargetCoordinates();
    gameboard.receiveAttack(coordinates);
    moves.push(coordinates);
    const attackResult = gameboard.reportAttack(coordinates);

    if (attackResult === "hit") {
      lastHits.push(coordinates);
      if (lastHits.length >= 2) {
        shipOrientation =
          lastHits[0][0] === lastHits[1][0] ? "horizontal" : "vertical";
        if (shipOrientation === "horizontal") {
          lastDirection = lastHits[0][1] < lastHits[1][1] ? "right" : "left";
        } else {
          lastDirection = lastHits[0][0] < lastHits[1][0] ? "down" : "up";
        }
      }
      sinkMode = true;
    }

    if (gameboard.isShipSunkAt(coordinates)) {
      lastHits = [];
      sinkMode = false;
      shipOrientation = null;
      lastDirection = null;

      const sunkShipCells = gameboard.getCellsOfSunkShips();

      sunkShipCells.forEach(([x, y]) => {
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

        surroundingCells.forEach(([sx, sy]) => {
          if (
            sx >= 0 &&
            sx < 10 &&
            sy >= 0 &&
            sy < 10 &&
            !moves.some(([mx, my]) => mx === sx && my === sy)
          ) {
            cellsToAvoid.push([sx, sy]);
          }
        });
      });
    }
  };

  const getMoves = () => moves;
  const getShipOrientation = () => shipOrientation;
  const getLastDirection = () => lastDirection;
  const getLastHits = () => lastHits;
  const getSinkMode = () => sinkMode;

  return {
    getMoves,
    getShipOrientation,
    getLastDirection,
    getLastHits,
    getSinkMode,
    aiAttack,
    generateRandomCoordinates,
    isCoordinatesInMoves,
    isValidCoordinates,
    generateTargetCoordinates,
    getPotentialTargets,
  };
};

export default aiPlayer;
