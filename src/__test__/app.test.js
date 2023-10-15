import Ship from "../ship";

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
