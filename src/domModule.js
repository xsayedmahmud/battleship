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
const selectAll = (selector) => document.querySelectorAll(selector);

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
  const ships = selectAll(".ship");
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
      boardDiv.appendChild(cellElement);
    }
  }

  container.appendChild(boardDiv);

  const shipSegments = gameboard.getShipSegments();

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
      const shipImage = create("img");
      shipImage.src = imgSrc;
      shipImage.draggable = true;
      shipImage.className = `ship ${isAi ? "ai-ship" : "human-ship"} ${
        ship.name
      } ${ship.length}`;

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

const handleShipRotation = (e, humanGameBoard) => {
  const shipImage = e.target;
  const { orientation, startPos, length } = shipImage.dataset;
  const newOrientation =
    orientation === "horizontal" ? "vertical" : "horizontal";
  const [startX, startY] = startPos.split(",").map(Number);
  const ship = humanGameBoard.getShipAt([startX, startY]);

  for (let i = 0; i < length; i++) {
    const x = orientation === "horizontal" ? startX : startX + i;
    const y = orientation === "horizontal" ? startY + i : startY;

    const validPositions = humanGameBoard.isValidRotation(
      ship,
      [x, y],
      newOrientation
    );

    if (validPositions) {
      validPositions.sort(([x1, y1], [x2, y2]) => {
        if (x1 === x2) {
          return y1 - y2;
        }
        return x1 - x2;
      });

      shipImage.dataset.orientation = newOrientation;
      shipImage.src =
        newOrientation === "horizontal"
          ? shipImagesHorizontal[`${ship.name}${ship.length}h`]
          : shipImagesVertical[`${ship.name}${ship.length}v`];

      humanGameBoard.placeShipDragAndDrop(
        ship,
        validPositions[0],
        newOrientation
      );
      adjustShipSizeAndPositions();
      return;
    }
  }

  shipImage.style.animation = "vibrate 0.3s linear";
  shipImage.style.border = "2px solid red";

  setTimeout(() => {
    shipImage.style.animation = "";
    shipImage.style.border = "";
  }, 300);
};

let currentDragData = null;
let dragging = false;

const handleTouchStart = (e) => {
  const ship = e.target;
  const touch = e.touches[0];
  dragging = true;

  const rect = ship.getBoundingClientRect();

  const offsetX = touch.clientX - rect.left;
  const offsetY = touch.clientY - rect.top;

  const grabPointX = Math.floor((offsetX / rect.width) * ship.dataset.length);
  const grabPointY = Math.floor((offsetY / rect.height) * ship.dataset.length);

  currentDragData = {
    shipName: ship.dataset.name,
    shipLength: ship.dataset.length,
    orientation: ship.dataset.orientation,
    startPos: ship.dataset.startPos,
    endPos: ship.dataset.endPos,
    grabPointX,
    grabPointY,
  };

  const allShips = selectAll(".ship");
  setTimeout(() => {
    if (dragging) {
      allShips.forEach((shipElm) => {
        shipElm.style.pointerEvents = "none";
      });
    }
  }, 0);
};

const handleDragStart = (e) => {
  const ship = e.target;
  dragging = true;
  const rect = ship.getBoundingClientRect();

  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const grabPointX = Math.floor((offsetX / rect.width) * ship.dataset.length);
  const grabPointY = Math.floor((offsetY / rect.height) * ship.dataset.length);

  currentDragData = {
    shipName: ship.dataset.name,
    shipLength: ship.dataset.length,
    orientation: ship.dataset.orientation,
    startPos: ship.dataset.startPos,
    endPos: ship.dataset.endPos,
    grabPointX,
    grabPointY,
  };

  const allShips = selectAll(".ship");
  setTimeout(() => {
    if (dragging) {
      allShips.forEach((shipElm) => {
        shipElm.style.pointerEvents = "none";
      });
    }
  }, 0);
};

let touchData;
const handleTouchMove = (e, humanGameBoard) => {
  e.preventDefault();
  selectAll(".cell").forEach((cell) => {
    cell.style.backgroundColor = "";
  });

  const touchX = e.touches[0].clientX;
  const touchY = e.touches[0].clientY;
  const cellElement = document.elementFromPoint(touchX, touchY);
  const cellsToHighlight = [];
  let isValid = false;

  if (cellElement && cellElement.classList.contains("cell")) {
    const [hoverX, hoverY] = cellElement.dataset.pos.split(",").map(Number);
    const draggedData = currentDragData || {};
    const {
      shipLength,
      orientation,
      grabPointX,
      grabPointY,
      startPos,
      endPos,
    } = draggedData;

    for (let i = 0; i < shipLength; i++) {
      let dataPos;
      if (orientation === "horizontal") {
        dataPos = `${hoverX},${hoverY - grabPointX + i}`;
      } else {
        dataPos = `${hoverX - grabPointY + i},${hoverY}`;
      }
      const cell = select(`[data-pos="${dataPos}"]`);
      if (cell) {
        cellsToHighlight.push(cell);
      }
    }

    isValid = humanGameBoard.isValidDragPlacement(
      cellsToHighlight.filter(Boolean).map((cell) => cell.dataset.pos),
      startPos,
      endPos,
      orientation
    );

    cellsToHighlight.forEach((cell) => {
      if (cell) {
        cell.style.backgroundColor = isValid ? "green" : "red";
      }
    });
  }

  touchData = {
    cellsToHighlight: cellsToHighlight || [],
    isValid: isValid || false,
  };
};

const handleDragOver = (e, humanGameBoard) => {
  e.preventDefault();
  selectAll(".cell").forEach((cell) => {
    cell.style.backgroundColor = "";
  });

  const [hoverX, hoverY] = e.target.dataset.pos.split(",").map(Number);
  const draggedData = currentDragData || {};
  const { shipLength, orientation, grabPointX, grabPointY, startPos, endPos } =
    draggedData;

  const cellsToHighlight = [];

  for (let i = 0; i < shipLength; i++) {
    let dataPos;
    if (orientation === "horizontal") {
      dataPos = `${hoverX},${hoverY - grabPointX + i}`;
    } else {
      dataPos = `${hoverX - grabPointY + i},${hoverY}`;
    }
    const cell = select(`[data-pos="${dataPos}"]`);
    if (cell) {
      cellsToHighlight.push(cell);
    }
  }

  const isValid = humanGameBoard.isValidDragPlacement(
    cellsToHighlight.filter(Boolean).map((cell) => cell.dataset.pos),
    startPos,
    endPos,
    orientation
  );

  cellsToHighlight.forEach((cell) => {
    if (cell) {
      cell.style.backgroundColor = isValid ? "green" : "red";
    }
  });

  return {
    cellsToHighlight,
    isValid,
  };
};

const handleTouchEnd = (e, humanGameBoard) => {
  const draggedData = currentDragData || {};
  const { orientation, startPos } = draggedData;

  const [startX, startY] = startPos.split(",").map(Number);
  const ship = humanGameBoard.getShipAt([startX, startY]);

  const touchX = e.changedTouches[0].clientX;
  const touchY = e.changedTouches[0].clientY;
  const cellElement = document.elementFromPoint(touchX, touchY);

  if (cellElement && cellElement.classList.contains("cell")) {
    if (touchData) {
      if (touchData.isValid) {
        const [x, y] = touchData.cellsToHighlight[0].dataset.pos
          .split(",")
          .map(Number);

        const success = humanGameBoard.placeShipDragAndDrop(
          ship,
          [x, y],
          orientation
        );

        if (success) {
          adjustShipSizeAndPositions();
        } else {
          console.log(`Failed to place ship at ${x}, ${y}`);
        }
      }
    }
  }

  clearCellColors();
  dragging = false;

  const allShips = selectAll(".ship");
  allShips.forEach((shipElm) => {
    shipElm.style.pointerEvents = "";
  });
  currentDragData = null;
};

const handleDrop = (e, humanGameBoard) => {
  e.preventDefault();

  const draggedData = currentDragData || {};
  const { orientation, startPos } = draggedData;

  const [startX, startY] = startPos.split(",").map(Number);
  const ship = humanGameBoard.getShipAt([startX, startY]);

  const dropData = handleDragOver(e, humanGameBoard);

  if (dropData.isValid) {
    const [x, y] = dropData.cellsToHighlight[0].dataset.pos
      .split(",")
      .map(Number);

    const success = humanGameBoard.placeShipDragAndDrop(
      ship,
      [x, y],
      orientation
    );

    if (success) {
      adjustShipSizeAndPositions();
    } else {
      console.log(`Failed to place ship at ${x}, ${y}`);
    }
  }

  currentDragData = null;
};

const clearCellColors = () => {
  const allCells = selectAll(".cell");
  allCells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
};

const handleDragEnd = (e) => {
  dragging = false;

  const allShips = selectAll(".ship");

  allShips.forEach((shipElm) => {
    shipElm.style.pointerEvents = "";
  });

  clearCellColors();
};

const handleDragLeave = (e) => {
  clearCellColors();
};

const eventHandlers = {
  handleDragOverEvent: null,
  handleDropEvent: null,
  handleDoubleClick: null,

  handleDragStartEvent: (e) => {
    if (e.target.classList.contains("ship")) {
      handleDragStart(e);
    }
  },

  handleDragLeaveEvent: (e) => {
    if (e.target.classList.contains("cell")) {
      handleDragLeave(e);
    }
  },

  handleDragEndEvent: (e) => {
    if (e.target.classList.contains("ship")) {
      handleDragEnd(e);
    }
  },
};

const touchEventHandlers = {
  handleTouchStartEvent: null,
  handleTouchMoveEvent: null,
  handleTouchEndEvent: null,
};

const addTouchEvents = (boardDiv, humanGameBoard) => {
  touchEventHandlers.handleTouchStartEvent = (e) => {
    if (e.target.classList.contains("ship")) {
      handleTouchStart(e, humanGameBoard);
    }
  };

  touchEventHandlers.handleTouchMoveEvent = (e) => {
    if (e.target.classList.contains("cell")) {
      handleTouchMove(e, humanGameBoard);
    }
  };

  touchEventHandlers.handleTouchEndEvent = (e) => {
    if (e.target.classList.contains("cell")) {
      handleTouchEnd(e, humanGameBoard);
    }
  };

  boardDiv.addEventListener(
    "touchstart",
    touchEventHandlers.handleTouchStartEvent
  );

  boardDiv.addEventListener(
    "touchmove",
    touchEventHandlers.handleTouchMoveEvent
  );

  boardDiv.addEventListener("touchend", touchEventHandlers.handleTouchEndEvent);
};

const addDragAndDropEvents = (boardDiv, humanGameBoard) => {
  eventHandlers.handleDragOverEvent = (e) => {
    if (e.target.classList.contains("cell")) {
      handleDragOver(e, humanGameBoard);
    }
  };

  eventHandlers.handleDropEvent = (e) => {
    if (e.target.classList.contains("cell")) {
      handleDrop(e, humanGameBoard);
      clearCellColors();
    }
  };

  eventHandlers.handleDoubleClick = (e) => {
    if (e.target.classList.contains("ship")) {
      handleShipRotation(e, humanGameBoard);
      currentDragData = null;
    }
  };

  boardDiv.addEventListener("dragstart", eventHandlers.handleDragStartEvent);
  boardDiv.addEventListener("dragover", eventHandlers.handleDragOverEvent);
  boardDiv.addEventListener("dragleave", eventHandlers.handleDragLeaveEvent);
  boardDiv.addEventListener("drop", eventHandlers.handleDropEvent);
  boardDiv.addEventListener("dragend", eventHandlers.handleDragEndEvent);
  boardDiv.addEventListener("dblclick", eventHandlers.handleDoubleClick);
};

const removeDragAndDropEvents = (boardDiv) => {
  boardDiv.removeEventListener("dragstart", eventHandlers.handleDragStartEvent);
  boardDiv.removeEventListener("dragover", eventHandlers.handleDragOverEvent);
  boardDiv.removeEventListener("dragleave", eventHandlers.handleDragLeaveEvent);
  boardDiv.removeEventListener("drop", eventHandlers.handleDropEvent);
  boardDiv.removeEventListener("dragend", eventHandlers.handleDragEndEvent);
  boardDiv.removeEventListener("dblclick", eventHandlers.handleDoubleClick);
};

const removeTouchEvents = (boardDiv) => {
  boardDiv.removeEventListener(
    "touchstart",
    touchEventHandlers.handleTouchStartEvent
  );
  boardDiv.removeEventListener(
    "touchmove",
    touchEventHandlers.handleTouchMoveEvent
  );
  boardDiv.removeEventListener(
    "touchend",
    touchEventHandlers.handleTouchEndEvent
  );
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

  const humanBoardDiv = select(".human .board");
  addDragAndDropEvents(humanBoardDiv, humanGameBoard);
  addTouchEvents(humanBoardDiv, humanGameBoard);
};

export {
  renderBoard,
  adjustShipSizeAndPositions,
  removeDragAndDropEvents,
  addDragAndDropEvents,
  addTouchEvents,
  removeTouchEvents,
};
