import Ship from "../ship";
import Gameboard from "../gameboard";
import aiPlayer from "../aiPlayer";
import gameLoop from "../gameloop";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3, "submarine");
  });

  test("should initialize with correct length", () => {
    expect(ship.length).toBe(3);
  });

  test("should initialize with zero hits", () => {
    expect(ship.getHits()).toBe(0);
  });

  test("should increase hits by 1", () => {
    ship.hit();
    expect(ship.getHits()).toEqual(1);
  });

  test("should return true if the ship is sunk", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard();
  });
  test("ships occupy n points based on their length", () => {
    const ship = Ship(5);
    gameboard.placeShip(ship, [0, 0], "horizontal");

    expect(gameboard.getShipAt([0, 0])).toBe(ship);
    expect(gameboard.getShipAt([0, 1])).toBe(ship);
    expect(gameboard.getShipAt([0, 2])).toBe(ship);
    expect(gameboard.getShipAt([0, 3])).toBe(ship);
    expect(gameboard.getShipAt([0, 4])).toBe(ship);
  });

  test("can receive an attack at specific coordinates", () => {
    gameboard.receiveAttack([0, 0]);

    expect(gameboard.getAttackAt([0, 0])).toBe(true);
  });

  test("can report if an attack hit a ship or miss", () => {
    const ship = Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");

    expect(gameboard.reportAttack([0, 0])).toBe("hit");
    expect(gameboard.reportAttack([1, 1])).toBe("miss");
  });

  test("can report missed attacks", () => {
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 1]);

    expect(gameboard.getMissedAttacks()).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });

  test("can report if all ships have been sunk", () => {
    const ship1 = Ship(2);
    const ship2 = Ship(3);
    gameboard.placeShip(ship1, [0, 0], "horizontal");
    gameboard.placeShip(ship2, [1, 1], "horizontal");

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([1, 2]);
    gameboard.receiveAttack([1, 3]);

    expect(gameboard.isAllShipSunk()).toBe(true);
  });

  test("ships cannot overlap", () => {
    const ship1 = Ship(2);
    const ship2 = Ship(3);

    gameboard.placeShip(ship1, [0, 0], "horizontal");

    expect(gameboard.placeShip(ship2, [0, 0], "horizontal")).toBe(false);
    expect(gameboard.placeShip(ship2, [0, 1], "horizontal")).toBe(false);
  });

  test("ships must have at least one point gap between them", () => {
    const ship1 = Ship(2);
    const ship2 = Ship(3);

    gameboard.placeShip(ship1, [0, 0], "horizontal");
    expect(gameboard.placeShip(ship2, [0, 2], "horizontal")).toBe(false);
    expect(gameboard.placeShip(ship2, [1, 0], "horizontal")).toBe(false);
  });

  test("should clear the board and reset all attacks", () => {
    const ship = Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    gameboard.reset();

    expect(gameboard.getShipAt([0, 0])).toBe(null);
    expect(gameboard.getAttackAt([0, 0])).toBe(false);
  });

  test("place all the ships on the board", () => {
    const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
    gameboard.placeRandomShips(gameboard, ships);
    const placedShips = gameboard.getShips();

    expect(placedShips.length).toBe(ships.length);
    placedShips.forEach((placedShip) => {
      expect(ships).toContainEqual(placedShip);
    });
  });
});

describe("aiPlayer", () => {
  let aiPlayerInstances;
  let mockGameboard;

  beforeEach(() => {
    aiPlayerInstances = aiPlayer();
    mockGameboard = {
      receiveAttack: jest.fn(),
      reportAttack: jest.fn(),
      isShipSunkAt: jest.fn(),
    };
  });

  test("should attack adjacent cells after a hit", () => {
    mockGameboard.reportAttack.mockReturnValueOnce("hit");
    aiPlayerInstances.aiAttack(mockGameboard);
    const firstMove = aiPlayerInstances.getMoves().slice(-1)[0];
    mockGameboard.reportAttack.mockReturnValueOnce("miss");
    aiPlayerInstances.aiAttack(mockGameboard);
    const lastMove = aiPlayerInstances.getMoves().slice(-1)[0];

    const adjacentCells = [
      [firstMove[0] + 1, firstMove[1]],
      [firstMove[0] - 1, firstMove[1]],
      [firstMove[0], firstMove[1] + 1],
      [firstMove[0], firstMove[1] - 1],
    ];

    expect(adjacentCells).toContainEqual(lastMove);
  });

  test("should determine the orientation of the ship after a second hit", () => {
    mockGameboard.reportAttack
      .mockReturnValueOnce("hit")
      .mockReturnValueOnce("hit");

    aiPlayerInstances.aiAttack(mockGameboard);
    aiPlayerInstances.aiAttack(mockGameboard);

    const orientation = aiPlayerInstances.getShipOrientation();
    expect(orientation).toBeTruthy();
  });

  test("continue attacking in the determined orientation until a miss ans switch direction", () => {
    mockGameboard.reportAttack
      .mockReturnValueOnce("hit")
      .mockReturnValueOnce("hit")
      .mockReturnValueOnce("hit")
      .mockReturnValueOnce("miss");

    aiPlayerInstances.aiAttack(mockGameboard);
    aiPlayerInstances.aiAttack(mockGameboard);

    const initialOrientation = aiPlayerInstances.getShipOrientation();
    const initialDirection = aiPlayerInstances.getLastDirection();

    aiPlayerInstances.aiAttack(mockGameboard);

    const orientationAfterThirdHit = aiPlayerInstances.getShipOrientation();
    const directionAfterThirdHit = aiPlayerInstances.getLastDirection();

    expect(orientationAfterThirdHit).toBe(initialOrientation);
    expect(directionAfterThirdHit).toBe(initialDirection);

    aiPlayerInstances.aiAttack(mockGameboard);

    const orientationAfterMiss = aiPlayerInstances.getShipOrientation();
    const directionAfterMiss = aiPlayerInstances.getLastDirection();

    expect(orientationAfterMiss).toBe(initialOrientation);
    expect(directionAfterMiss).not.toBe(initialDirection);
  });

  test("skip over already-hit coordinates when changing direction", () => {
    mockGameboard.reportAttack
      .mockReturnValueOnce("hit")
      .mockReturnValueOnce("hit");

    aiPlayerInstances.aiAttack(mockGameboard);
    aiPlayerInstances.aiAttack(mockGameboard);

    mockGameboard.reportAttack.mockReturnValueOnce("miss");

    aiPlayerInstances.aiAttack(mockGameboard);

    const nextTarget = aiPlayerInstances.generateTargetCoordinates();

    expect(aiPlayerInstances.getMoves()).not.toContainEqual(nextTarget);
  });

  test("revert to random attacks after a sinking ship", () => {
    // const randomSpy = jest.spyOn(
    //   aiPlayerInstances,
    //   "generateRandomCoordinates"
    // );
    mockGameboard.reportAttack.mockReturnValueOnce("hit");
    mockGameboard.isShipSunkAt.mockReturnValueOnce(true);

    aiPlayerInstances.aiAttack(mockGameboard);
    aiPlayerInstances.aiAttack(mockGameboard);

    // expect(randomSpy).toHaveBeenCalled();
    expect(aiPlayerInstances.getLastHits()).toEqual([]);
    expect(aiPlayerInstances.getSinkMode()).toBe(false);
    expect(aiPlayerInstances.getShipOrientation()).toBe(null);
    expect(aiPlayerInstances.getLastDirection()).toBe(null);
  });
});

describe("gameLoop", () => {
  let mainGameLoop;
  beforeEach(() => {
    mainGameLoop = gameLoop();
  });

  test("should initialize both gameboards", () => {
    mainGameLoop.initializeGame();

    expect(mainGameLoop.getHumanGameboard().getShips().length).toBe(5);
    expect(mainGameLoop.getAiGameboard().getShips().length).toBe(5);
  });

  test("should change turn", () => {
    mainGameLoop.changeTurn();
    expect(mainGameLoop.gameState.currentPlayer).toBe("ai");
    mainGameLoop.changeTurn();
    expect(mainGameLoop.gameState.currentPlayer).toBe("human");
  });

  test("should set game over state", () => {
    mainGameLoop.initializeGame();
    mainGameLoop
      .getHumanGameboard()
      .getShips()
      .forEach((ship) => {
        for (let i = 0; i < ship.length; i += 1) {
          ship.hit();
        }
      });
    mainGameLoop.checkGameOver();
    expect(mainGameLoop.gameState.isGameOver).toBe(true);
  });
});
