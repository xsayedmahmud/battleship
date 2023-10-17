import Ship from "../ship";
import Gameboard from "../gameboard";

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
