import Ship from "./ship";

import carrier5v from "./assets/carrier-5-v.svg";
import battleship4v from "./assets/battleship-4-v.svg";
import destroyer3v from "./assets/destroyer-3-v.svg";
import submarine3v from "./assets/submarine-3-v.svg";
import patrolboat2v from "./assets/patrolboat-2-v.svg";

import carrier5h from "./assets/carrier-5-h.svg";
import battleship4h from "./assets/battleship-4-h.svg";
import destroyer3h from "./assets/destroyer-3-h.svg";
import submarine3h from "./assets/submarine-3-h.svg";
import patrolboat2h from "./assets/patrolboat-2-h.svg";

const shipImagesVertical = {
  carrier5v,
  battleship4v,
  destroyer3v,
  submarine3v,
  patrolboat2v,
};

const shipImagesHorizontal = {
  carrier5h,
  battleship4h,
  destroyer3h,
  submarine3h,
  patrolboat2h,
};

const create = (element) => document.createElement(element);
const select = (selector) => document.querySelector(selector);

const addIndices = (container) => {
  const rowIndices = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const colIndices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const rowDiv = create("div");
  rowDiv.className = "row-indices";

  rowIndices.forEach((index) => {
    const indexDiv = create("div");
    indexDiv.className = "index";
    indexDiv.textContent = index;
    rowDiv.appendChild(indexDiv);
  });

  const colDiv = create("div");
  colDiv.className = "col-indices";

  colIndices.forEach((index) => {
    const indexDiv = create("div");
    indexDiv.className = "index";
    indexDiv.textContent = index;
    colDiv.appendChild(indexDiv);
  });

  container.appendChild(rowDiv);
  container.appendChild(colDiv);
};

const adjustShipSizeAndPositions = () => {
  const ships = document.querySelectorAll(".ship");
  ships.forEach((ship) => {
    const shipStartCell = select(`[data-pos = "${ship.dataset.startPos}"]`);
    const cellSize = shipStartCell.offsetWidth;
    const startPositionX = shipStartCell.offsetLeft;
    const startPositionY = shipStartCell.offsetTop;
    const shipLength = ship.dataset.length;
    const { orientation } = ship.dataset;

    if (orientation === "horizontal") {
      ship.style.width = `${cellSize * shipLength}px`;
      ship.style.height = `${cellSize}px`;
      ship.style.left = `${startPositionX}px`;
      ship.style.top = `${startPositionY}px`;
    } else {
      ship.style.width = `${cellSize}px`;
      ship.style.height = `${cellSize * shipLength}px`;
      ship.style.left = `${startPositionX}px`;
      ship.style.top = `${startPositionY}px`;
    }
  });
};

const createGameContainer = (
  gameboard,
  container,
  renderedShips,
  isAi = false
) => {
  addIndices(container);
  const boardDiv = create("div");
  boardDiv.className = "board";

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cellElement = create("div");
      cellElement.className = "cell";
      cellElement.dataset.pos = `${x},${y}`;
      cellElement.addEventListener("click", (e) => {
        console.log(e.target.dataset.pos);
      });
      boardDiv.appendChild(cellElement);
    }
  }

  container.appendChild(boardDiv);

  const shipSegments = gameboard.getShipSegments();
  console.log(shipSegments);

  shipSegments.forEach(([start, end]) => {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const ship = gameboard.getShipAt([startX, startY]);

    if (ship && !renderedShips.includes(ship.name)) {
      const orientation = startX === endX ? "horizontal" : "vertical";
      const imgSrc =
        orientation === "horizontal"
          ? shipImagesHorizontal[`${ship.name}${ship.length}h`]
          : shipImagesVertical[`${ship.name}${ship.length}v`];

      // const shipStartCell = select(`[data-pos="${startX},${startY}"]`);
      // const shipEndCell = select(`[data-pos="${endX},${endY}"]`);

      const shipImage = create("img");
      shipImage.src = imgSrc;
      shipImage.draggable = true;
      shipImage.className = `ship ${ship.name} ${ship.length}`;
      if (isAi) shipImage.className += "ai";
      shipImage.dataset.startPos = `${startX},${startY}`;
      shipImage.dataset.endPos = `${endX},${endY}`;
      shipImage.dataset.length = ship.length;
      shipImage.dataset.name = ship.name;
      shipImage.dataset.orientation = orientation;
      boardDiv.appendChild(shipImage);
      renderedShips.push(ship.name);
    }
  });
  adjustShipSizeAndPositions();
};

const renderBoard = (
  humanContainer,
  aiContainer,
  humanGameBoard,
  aiGameBoard
) => {
  const renderedShipsHuman = [];
  const renderedShipsAI = [];

  createGameContainer(humanGameBoard, humanContainer, renderedShipsHuman);

  createGameContainer(aiGameBoard, aiContainer, renderedShipsAI, true);

  //   const humanBoardDiv = select(".human .board");
  //   addDragAndDropEvents(humanBoardDiv, humanGameBoard);
};

export { renderBoard, adjustShipSizeAndPositions };
