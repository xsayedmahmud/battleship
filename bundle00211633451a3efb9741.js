/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/aiPlayer.js":
/*!*************************!*\
  !*** ./src/aiPlayer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var aiPlayer = function aiPlayer() {
  var moves = [];
  var lastHits = [];
  var sinkMode = false;
  var shipOrientation = null;
  var lastDirection = null;
  var cellsToAvoid = [];
  var isCoordinatesInMoves = function isCoordinatesInMoves(x, y) {
    return moves.some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        moveX = _ref2[0],
        moveY = _ref2[1];
      return moveX === x && moveY === y;
    });
  };
  var isCellsToAvoid = function isCellsToAvoid(x, y) {
    return cellsToAvoid.some(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        avoidX = _ref4[0],
        avoidY = _ref4[1];
      return avoidX === x && avoidY === y;
    });
  };
  var isValidCoordinates = function isValidCoordinates(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  };
  var getPotentialTargets = function getPotentialTargets(lastX, lastY, shipOrientation, lastDirection) {
    var potentialTargets = [];
    if (shipOrientation) {
      if (shipOrientation === "horizontal") {
        potentialTargets = lastDirection === "right" ? [[lastX, lastY + 1]] : [[lastX, lastY - 1]];
      } else if (shipOrientation === "vertical") {
        potentialTargets = lastDirection === "down" ? [[lastX + 1, lastY]] : [[lastX - 1, lastY]];
      }
    } else {
      potentialTargets = [[lastX + 1, lastY], [lastX - 1, lastY], [lastX, lastY + 1], [lastX, lastY - 1]];
    }
    return potentialTargets;
  };
  var generateRandomCoordinates = function generateRandomCoordinates() {
    var x;
    var y;
    if (moves.length >= 100) throw new Error("All possible coordinates are used up");
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while ((x + y) % 2 !== 0 || isCoordinatesInMoves(x, y) || isCellsToAvoid(x, y));
    return [x, y];
  };
  var generateTargetCoordinates = function generateTargetCoordinates() {
    if (!sinkMode && lastHits.length === 0) return generateRandomCoordinates();
    var _lastHits = _slicedToArray(lastHits[lastHits.length - 1], 2),
      lastX = _lastHits[0],
      lastY = _lastHits[1];
    var potentialTargets = getPotentialTargets(lastX, lastY, shipOrientation, lastDirection);
    var target = potentialTargets.find(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        x = _ref6[0],
        y = _ref6[1];
      return isValidCoordinates(x, y) && !isCoordinatesInMoves(x, y) && !isCellsToAvoid(x, y);
    });
    if (sinkMode && !target) {
      var _lastHits$ = _slicedToArray(lastHits[0], 2),
        newLastX = _lastHits$[0],
        newLastY = _lastHits$[1];
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
          console.warn("Unexpected value for lastDirection: ".concat(lastDirection));
          break;
      }
      var potentialTargetsOpposite = getPotentialTargets(newLastX, newLastY, shipOrientation, lastDirection);
      var targetOpposite = potentialTargetsOpposite.find(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          x = _ref8[0],
          y = _ref8[1];
        return isValidCoordinates(x, y) && !isCoordinatesInMoves(x, y) && !isCellsToAvoid(x, y);
      });
      if (targetOpposite) {
        lastHits.unshift(targetOpposite);
      }
      return targetOpposite || generateRandomCoordinates();
    }
    return target || generateRandomCoordinates();
  };
  var aiAttack = function aiAttack(gameboard) {
    var coordinates = generateTargetCoordinates();
    gameboard.receiveAttack(coordinates);
    moves.push(coordinates);
    var attackResult = gameboard.reportAttack(coordinates);
    if (attackResult === "hit") {
      lastHits.push(coordinates);
      if (lastHits.length >= 2) {
        shipOrientation = lastHits[0][0] === lastHits[1][0] ? "horizontal" : "vertical";
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
      var sunkShipCells = gameboard.getCellsOfSunkShips();
      sunkShipCells.forEach(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
          x = _ref10[0],
          y = _ref10[1];
        var surroundingCells = [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y], [x + 1, y + 1], [x + 1, y - 1], [x - 1, y + 1], [x - 1, y - 1]];
        surroundingCells.forEach(function (_ref11) {
          var _ref12 = _slicedToArray(_ref11, 2),
            sx = _ref12[0],
            sy = _ref12[1];
          if (sx >= 0 && sx < 10 && sy >= 0 && sy < 10 && !moves.some(function (_ref13) {
            var _ref14 = _slicedToArray(_ref13, 2),
              mx = _ref14[0],
              my = _ref14[1];
            return mx === sx && my === sy;
          })) {
            cellsToAvoid.push([sx, sy]);
          }
        });
      });
    }
  };
  var getMoves = function getMoves() {
    return moves;
  };
  var getShipOrientation = function getShipOrientation() {
    return shipOrientation;
  };
  var getLastDirection = function getLastDirection() {
    return lastDirection;
  };
  var getLastHits = function getLastHits() {
    return lastHits;
  };
  var getSinkMode = function getSinkMode() {
    return sinkMode;
  };
  return {
    getMoves: getMoves,
    getShipOrientation: getShipOrientation,
    getLastDirection: getLastDirection,
    getLastHits: getLastHits,
    getSinkMode: getSinkMode,
    aiAttack: aiAttack,
    generateRandomCoordinates: generateRandomCoordinates,
    isCoordinatesInMoves: isCoordinatesInMoves,
    isValidCoordinates: isValidCoordinates,
    generateTargetCoordinates: generateTargetCoordinates,
    getPotentialTargets: getPotentialTargets
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (aiPlayer);

/***/ }),

/***/ "./src/domModule.js":
/*!**************************!*\
  !*** ./src/domModule.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDragAndDropEvents: () => (/* binding */ addDragAndDropEvents),
/* harmony export */   adjustShipSizeAndPositions: () => (/* binding */ adjustShipSizeAndPositions),
/* harmony export */   removeDragAndDropEvents: () => (/* binding */ removeDragAndDropEvents),
/* harmony export */   renderBoard: () => (/* binding */ renderBoard)
/* harmony export */ });
/* harmony import */ var _assets_carrier_5_v_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/carrier-5-v.svg */ "./src/assets/carrier-5-v.svg");
/* harmony import */ var _assets_battleship_4_v_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/battleship-4-v.svg */ "./src/assets/battleship-4-v.svg");
/* harmony import */ var _assets_destroyer_3_v_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/destroyer-3-v.svg */ "./src/assets/destroyer-3-v.svg");
/* harmony import */ var _assets_submarine_3_v_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/submarine-3-v.svg */ "./src/assets/submarine-3-v.svg");
/* harmony import */ var _assets_patrolboat_2_v_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/patrolboat-2-v.svg */ "./src/assets/patrolboat-2-v.svg");
/* harmony import */ var _assets_carrier_5_h_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/carrier-5-h.svg */ "./src/assets/carrier-5-h.svg");
/* harmony import */ var _assets_battleship_4_h_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/battleship-4-h.svg */ "./src/assets/battleship-4-h.svg");
/* harmony import */ var _assets_destroyer_3_h_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/destroyer-3-h.svg */ "./src/assets/destroyer-3-h.svg");
/* harmony import */ var _assets_submarine_3_h_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/submarine-3-h.svg */ "./src/assets/submarine-3-h.svg");
/* harmony import */ var _assets_patrolboat_2_h_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/patrolboat-2-h.svg */ "./src/assets/patrolboat-2-h.svg");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var shipImagesVertical = {
  carrier5v: _assets_carrier_5_v_svg__WEBPACK_IMPORTED_MODULE_0__,
  battleship4v: _assets_battleship_4_v_svg__WEBPACK_IMPORTED_MODULE_1__,
  destroyer3v: _assets_destroyer_3_v_svg__WEBPACK_IMPORTED_MODULE_2__,
  submarine3v: _assets_submarine_3_v_svg__WEBPACK_IMPORTED_MODULE_3__,
  patrolboat2v: _assets_patrolboat_2_v_svg__WEBPACK_IMPORTED_MODULE_4__
};
var shipImagesHorizontal = {
  carrier5h: _assets_carrier_5_h_svg__WEBPACK_IMPORTED_MODULE_5__,
  battleship4h: _assets_battleship_4_h_svg__WEBPACK_IMPORTED_MODULE_6__,
  destroyer3h: _assets_destroyer_3_h_svg__WEBPACK_IMPORTED_MODULE_7__,
  submarine3h: _assets_submarine_3_h_svg__WEBPACK_IMPORTED_MODULE_8__,
  patrolboat2h: _assets_patrolboat_2_h_svg__WEBPACK_IMPORTED_MODULE_9__
};
var create = function create(element) {
  return document.createElement(element);
};
var select = function select(selector) {
  return document.querySelector(selector);
};
var selectAll = function selectAll(selector) {
  return document.querySelectorAll(selector);
};
var addIndices = function addIndices(container) {
  var rowIndices = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  var colIndices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  var rowDiv = create("div");
  rowDiv.className = "row-indices";
  rowIndices.forEach(function (index) {
    var indexDiv = create("div");
    indexDiv.className = "index";
    indexDiv.textContent = index;
    rowDiv.appendChild(indexDiv);
  });
  var colDiv = create("div");
  colDiv.className = "col-indices";
  colIndices.forEach(function (index) {
    var indexDiv = create("div");
    indexDiv.className = "index";
    indexDiv.textContent = index;
    colDiv.appendChild(indexDiv);
  });
  container.appendChild(rowDiv);
  container.appendChild(colDiv);
};
var adjustShipSizeAndPositions = function adjustShipSizeAndPositions() {
  var ships = selectAll(".ship");
  ships.forEach(function (ship) {
    var shipStartCell = select("[data-pos = \"".concat(ship.dataset.startPos, "\"]"));
    var cellSize = shipStartCell.offsetWidth;
    var startPositionX = shipStartCell.offsetLeft;
    var startPositionY = shipStartCell.offsetTop;
    var shipLength = ship.dataset.length;
    var orientation = ship.dataset.orientation;
    if (orientation === "horizontal") {
      ship.style.width = "".concat(cellSize * shipLength, "px");
      ship.style.height = "".concat(cellSize, "px");
      ship.style.left = "".concat(startPositionX, "px");
      ship.style.top = "".concat(startPositionY, "px");
    } else {
      ship.style.width = "".concat(cellSize, "px");
      ship.style.height = "".concat(cellSize * shipLength, "px");
      ship.style.left = "".concat(startPositionX, "px");
      ship.style.top = "".concat(startPositionY, "px");
    }
  });
};
var createGameContainer = function createGameContainer(gameboard, container, renderedShips) {
  var isAi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  addIndices(container);
  var boardDiv = create("div");
  boardDiv.className = "board";
  for (var x = 0; x < 10; x++) {
    var _loop = function _loop() {
      var cellElement = create("div");
      cellElement.className = "cell";
      cellElement.dataset.pos = "".concat(x, ",").concat(y);
      boardDiv.appendChild(cellElement);
      cellElement.addEventListener("click", function () {
        console.log(cellElement.dataset.pos);
      });
    };
    for (var y = 0; y < 10; y++) {
      _loop();
    }
  }
  container.appendChild(boardDiv);
  var shipSegments = gameboard.getShipSegments();
  shipSegments.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];
    var _start = _slicedToArray(start, 2),
      startX = _start[0],
      startY = _start[1];
    var _end = _slicedToArray(end, 2),
      endX = _end[0],
      endY = _end[1];
    var ship = gameboard.getShipAt([startX, startY]);
    if (ship && !renderedShips.includes(ship.name)) {
      var orientation = startX === endX ? "horizontal" : "vertical";
      var imgSrc = orientation === "horizontal" ? shipImagesHorizontal["".concat(ship.name).concat(ship.length, "h")] : shipImagesVertical["".concat(ship.name).concat(ship.length, "v")];
      var shipImage = create("img");
      shipImage.src = imgSrc;
      shipImage.draggable = true;
      shipImage.className = "ship ".concat(isAi ? "ai-ship" : "human-ship", " ").concat(ship.name, " ").concat(ship.length);
      shipImage.dataset.startPos = "".concat(startX, ",").concat(startY);
      shipImage.dataset.endPos = "".concat(endX, ",").concat(endY);
      shipImage.dataset.length = ship.length;
      shipImage.dataset.name = ship.name;
      shipImage.dataset.orientation = orientation;
      boardDiv.appendChild(shipImage);
      renderedShips.push(ship.name);
    }
  });
  adjustShipSizeAndPositions();
};
var handleShipRotation = function handleShipRotation(e, humanGameBoard) {
  var shipImage = e.target;
  var _shipImage$dataset = shipImage.dataset,
    orientation = _shipImage$dataset.orientation,
    startPos = _shipImage$dataset.startPos,
    length = _shipImage$dataset.length;
  var newOrientation = orientation === "horizontal" ? "vertical" : "horizontal";
  var _startPos$split$map = startPos.split(",").map(Number),
    _startPos$split$map2 = _slicedToArray(_startPos$split$map, 2),
    startX = _startPos$split$map2[0],
    startY = _startPos$split$map2[1];
  var ship = humanGameBoard.getShipAt([startX, startY]);
  for (var i = 0; i < length; i++) {
    var x = orientation === "horizontal" ? startX : startX + i;
    var y = orientation === "horizontal" ? startY + i : startY;
    var validPositions = humanGameBoard.isValidRotation(ship, [x, y], newOrientation);
    if (validPositions) {
      validPositions.sort(function (_ref3, _ref4) {
        var _ref5 = _slicedToArray(_ref3, 2),
          x1 = _ref5[0],
          y1 = _ref5[1];
        var _ref6 = _slicedToArray(_ref4, 2),
          x2 = _ref6[0],
          y2 = _ref6[1];
        if (x1 === x2) {
          return y1 - y2;
        }
        return x1 - x2;
      });
      shipImage.dataset.orientation = newOrientation;
      shipImage.src = newOrientation === "horizontal" ? shipImagesHorizontal["".concat(ship.name).concat(ship.length, "h")] : shipImagesVertical["".concat(ship.name).concat(ship.length, "v")];
      humanGameBoard.placeShipDragAndDrop(ship, validPositions[0], newOrientation);
      adjustShipSizeAndPositions();
      return;
    }
  }
  shipImage.style.animation = "vibrate 0.3s linear";
  shipImage.style.border = "2px solid red";
  setTimeout(function () {
    shipImage.style.animation = "";
    shipImage.style.border = "";
  }, 300);
};
var currentDragData = null;
var dragging = false;
var handleDragStart = function handleDragStart(e) {
  var ship = e.target;
  dragging = true;
  var rect = ship.getBoundingClientRect();
  var offsetX = e.clientX - rect.left;
  var offsetY = e.clientY - rect.top;
  var grabPointX = Math.floor(offsetX / rect.width * ship.dataset.length);
  var grabPointY = Math.floor(offsetY / rect.height * ship.dataset.length);
  currentDragData = {
    shipName: ship.dataset.name,
    shipLength: ship.dataset.length,
    orientation: ship.dataset.orientation,
    startPos: ship.dataset.startPos,
    endPos: ship.dataset.endPos,
    grabPointX: grabPointX,
    grabPointY: grabPointY
  };
  var allShips = selectAll(".ship");
  setTimeout(function () {
    if (dragging) {
      allShips.forEach(function (shipElm) {
        shipElm.style.pointerEvents = "none";
      });
    }
  }, 0);
};
var handleDragOver = function handleDragOver(e, humanGameBoard) {
  e.preventDefault();
  selectAll(".cell").forEach(function (cell) {
    cell.style.backgroundColor = "";
  });
  var _e$target$dataset$pos = e.target.dataset.pos.split(",").map(Number),
    _e$target$dataset$pos2 = _slicedToArray(_e$target$dataset$pos, 2),
    hoverX = _e$target$dataset$pos2[0],
    hoverY = _e$target$dataset$pos2[1];
  var draggedData = currentDragData || {};
  var shipLength = draggedData.shipLength,
    orientation = draggedData.orientation,
    grabPointX = draggedData.grabPointX,
    grabPointY = draggedData.grabPointY,
    startPos = draggedData.startPos,
    endPos = draggedData.endPos;
  var cellsToHighlight = [];
  for (var i = 0; i < shipLength; i++) {
    var dataPos = void 0;
    if (orientation === "horizontal") {
      dataPos = "".concat(hoverX, ",").concat(hoverY - grabPointX + i);
    } else {
      dataPos = "".concat(hoverX - grabPointY + i, ",").concat(hoverY);
    }
    var cell = select("[data-pos=\"".concat(dataPos, "\"]"));
    if (cell) {
      cellsToHighlight.push(cell);
    }
  }
  var isValid = humanGameBoard.isValidDragPlacement(cellsToHighlight.filter(Boolean).map(function (cell) {
    return cell.dataset.pos;
  }), startPos, endPos, orientation);
  cellsToHighlight.forEach(function (cell) {
    if (cell) {
      cell.style.backgroundColor = isValid ? "green" : "red";
    }
  });
  return {
    cellsToHighlight: cellsToHighlight,
    isValid: isValid
  };
};
var handleDrop = function handleDrop(e, humanGameBoard) {
  e.preventDefault();
  var draggedData = currentDragData || {};
  var orientation = draggedData.orientation,
    startPos = draggedData.startPos;
  var _startPos$split$map3 = startPos.split(",").map(Number),
    _startPos$split$map4 = _slicedToArray(_startPos$split$map3, 2),
    startX = _startPos$split$map4[0],
    startY = _startPos$split$map4[1];
  var ship = humanGameBoard.getShipAt([startX, startY]);
  var dropData = handleDragOver(e, humanGameBoard);
  if (dropData.isValid) {
    var _dropData$cellsToHigh = dropData.cellsToHighlight[0].dataset.pos.split(",").map(Number),
      _dropData$cellsToHigh2 = _slicedToArray(_dropData$cellsToHigh, 2),
      x = _dropData$cellsToHigh2[0],
      y = _dropData$cellsToHigh2[1];
    var success = humanGameBoard.placeShipDragAndDrop(ship, [x, y], orientation);
    if (success) {
      adjustShipSizeAndPositions();
    } else {
      console.log("Failed to place ship at ".concat(x, ", ").concat(y));
    }
  }
};
var clearCellColors = function clearCellColors() {
  var allCells = selectAll(".cell");
  allCells.forEach(function (cell) {
    cell.style.backgroundColor = "";
  });
};
var handleDragEnd = function handleDragEnd(e) {
  dragging = false;
  var allShips = selectAll(".ship");
  allShips.forEach(function (shipElm) {
    shipElm.style.pointerEvents = "";
  });
  clearCellColors();
};
var handleDragLeave = function handleDragLeave(e) {
  clearCellColors();
};
var eventHandlers = {
  handleDragOverEvent: null,
  handleDropEvent: null,
  handleDoubleClick: null,
  handleDragStartEvent: function handleDragStartEvent(e) {
    if (e.target.classList.contains("ship")) {
      handleDragStart(e);
    }
  },
  handleDragLeaveEvent: function handleDragLeaveEvent(e) {
    if (e.target.classList.contains("cell")) {
      handleDragLeave(e);
    }
  },
  handleDragEndEvent: function handleDragEndEvent(e) {
    if (e.target.classList.contains("ship")) {
      handleDragEnd(e);
    }
  }
};
var addDragAndDropEvents = function addDragAndDropEvents(boardDiv, humanGameBoard) {
  eventHandlers.handleDragOverEvent = function (e) {
    if (e.target.classList.contains("cell")) {
      handleDragOver(e, humanGameBoard);
    }
  };
  eventHandlers.handleDropEvent = function (e) {
    if (e.target.classList.contains("cell")) {
      handleDrop(e, humanGameBoard);
      clearCellColors();
    }
  };
  eventHandlers.handleDoubleClick = function (e) {
    if (e.target.classList.contains("ship")) {
      handleShipRotation(e, humanGameBoard);
    }
  };
  boardDiv.addEventListener("dragstart", eventHandlers.handleDragStartEvent);
  boardDiv.addEventListener("dragover", eventHandlers.handleDragOverEvent);
  boardDiv.addEventListener("dragleave", eventHandlers.handleDragLeaveEvent);
  boardDiv.addEventListener("drop", eventHandlers.handleDropEvent);
  boardDiv.addEventListener("dragend", eventHandlers.handleDragEndEvent);
  boardDiv.addEventListener("dblclick", eventHandlers.handleDoubleClick);
};
var removeDragAndDropEvents = function removeDragAndDropEvents(boardDiv) {
  boardDiv.removeEventListener("dragstart", eventHandlers.handleDragStartEvent);
  boardDiv.removeEventListener("dragover", eventHandlers.handleDragOverEvent);
  boardDiv.removeEventListener("dragleave", eventHandlers.handleDragLeaveEvent);
  boardDiv.removeEventListener("drop", eventHandlers.handleDropEvent);
  boardDiv.removeEventListener("dragend", eventHandlers.handleDragEndEvent);
  boardDiv.removeEventListener("dblclick", eventHandlers.handleDoubleClick);
};
var renderBoard = function renderBoard(humanContainer, aiContainer, humanGameBoard, aiGameBoard) {
  var renderedShipsHuman = [];
  var renderedShipsAI = [];
  createGameContainer(humanGameBoard, humanContainer, renderedShipsHuman);
  createGameContainer(aiGameBoard, aiContainer, renderedShipsAI, true);
  var humanBoardDiv = select(".human .board");
  addDragAndDropEvents(humanBoardDiv, humanGameBoard);
};


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Gameboard = function Gameboard() {
  var board = Array(10).fill(null).map(function () {
    return Array(10).fill(null);
  });
  var attacks = Array(10).fill(null).map(function () {
    return Array(10).fill(false);
  });
  var checkCell = function checkCell(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10 ? board[x][y] : null;
  };
  var isValidPlacement = function isValidPlacement(ship, _ref, orientation) {
    var _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1];
    if (orientation === "horizontal" && y + ship.length > 10) return false;
    if (orientation === "vertical" && x + ship.length > 10) return false;
    if (orientation === "horizontal") {
      for (var i = 0; i < ship.length; i++) {
        if (checkCell(x, y + i)) return false;
        if (checkCell(x, y + i + 1) || checkCell(x, y + i - 1) || checkCell(x + 1, y + i) || checkCell(x - 1, y + i) || checkCell(x + 1, y + i + 1) || checkCell(x + 1, y + i - 1) || checkCell(x - 1, y + i + 1) || checkCell(x - 1, y + i - 1)) return false;
      }
    } else if (orientation === "vertical") {
      for (var _i = 0; _i < ship.length; _i++) {
        if (checkCell(x + _i, y)) return false;
        if (checkCell(x + _i + 1, y) || checkCell(x + _i - 1, y) || checkCell(x + _i, y + 1) || checkCell(x + _i, y - 1) || checkCell(x + _i + 1, y + 1) || checkCell(x + _i + 1, y - 1) || checkCell(x + _i - 1, y + 1) || checkCell(x + _i - 1, y - 1)) return false;
      }
    }
    return true;
  };
  var ships = [];
  var shipSegments = [];
  var placeShip = function placeShip(ship, _ref3, orientation) {
    var _ref4 = _slicedToArray(_ref3, 2),
      x = _ref4[0],
      y = _ref4[1];
    if (!isValidPlacement(ship, [x, y], orientation)) return false;
    var endX = x;
    var endY = y;
    if (orientation === "horizontal") {
      for (var i = 0; i < ship.length; i++) {
        board[x][y + i] = ship;
      }
      endY = y + ship.length - 1;
    } else if (orientation === "vertical") {
      for (var _i2 = 0; _i2 < ship.length; _i2++) {
        board[x + _i2][y] = ship;
      }
      endX = x + ship.length - 1;
    }
    ships.push(ship);
    shipSegments.push([[x, y], [endX, endY]]);
    return true;
  };
  var getRandomCoordinate = function getRandomCoordinate() {
    return Math.floor(Math.random() * 10);
  };
  var getRandomOrientation = function getRandomOrientation() {
    return Math.random() > 0.5 ? "horizontal" : "vertical";
  };
  var placeRandomShips = function placeRandomShips(gameboard, shipsArr) {
    shipsArr.forEach(function (ship) {
      var placed = false;
      while (!placed) {
        var x = getRandomCoordinate();
        var y = getRandomCoordinate();
        var orientation = getRandomOrientation();
        placed = gameboard.placeShip(ship, [x, y], orientation);
      }
    });
  };
  var isShipSunkAt = function isShipSunkAt(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      x = _ref6[0],
      y = _ref6[1];
    var ship = board[x][y];
    return ship ? ship.isSunk() : false;
  };
  var hitAttacks = [];
  var missedAttacks = [];
  var receiveAttack = function receiveAttack(_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      x = _ref8[0],
      y = _ref8[1];
    attacks[x][y] = true;
    if (board[x][y]) {
      board[x][y].hit();
      hitAttacks.push([x, y]);
    } else {
      missedAttacks.push([x, y]);
    }
  };
  var reportAttack = function reportAttack(_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
      x = _ref10[0],
      y = _ref10[1];
    if (board[x][y]) {
      return "hit";
    }
    return "miss";
  };
  var reset = function reset() {
    board.forEach(function (row) {
      return row.fill(null);
    });
    attacks.forEach(function (row) {
      return row.fill(false);
    });
    ships.length = 0;
    shipSegments.length = 0;
    hitAttacks.length = 0;
    missedAttacks.length = 0;
  };
  var isWithingDraggedShip = function isWithingDraggedShip(x, y, startX, startY, endX, endY, orientation) {
    if (orientation === "horizontal") {
      return x === startX && y >= startY && y <= endY;
    }
    return y === startY && x >= startX && x <= endX;
  };
  var isValidRotation = function isValidRotation(ship, _ref11, orientation) {
    var _ref12 = _slicedToArray(_ref11, 2),
      x = _ref12[0],
      y = _ref12[1];
    var shipLength = ship.length;
    var directions = [-1, 1];
    var validPositions = [];
    directions.some(function (direction) {
      var tempPositions = [];
      for (var i = 0; i < shipLength; i++) {
        var newX = x + (orientation === "vertical" ? i * direction : 0);
        var newY = y + (orientation === "horizontal" ? i * direction : 0);
        if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10 && (board[newX][newY] === null || board[newX][newY] === ship)) {
          tempPositions.push([newX, newY]);
        } else {
          return false;
        }
      }
      var isValid = tempPositions.every(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 2),
          newX = _ref14[0],
          newY = _ref14[1];
        var surroundingCells = [[newX, newY + 1], [newX, newY - 1], [newX + 1, newY], [newX - 1, newY], [newX + 1, newY + 1], [newX + 1, newY - 1], [newX - 1, newY + 1], [newX - 1, newY - 1]];
        return surroundingCells.every(function (_ref15) {
          var _ref16 = _slicedToArray(_ref15, 2),
            sx = _ref16[0],
            sy = _ref16[1];
          return sx < 0 || sx >= 10 || sy < 0 || sy >= 10 || board[sx][sy] === null || board[sx][sy] === ship;
        });
      });
      if (isValid) {
        validPositions = tempPositions;
        return true;
      }
      return false;
    });
    return validPositions.length === shipLength ? validPositions : null;
  };
  var getCellsOfSunkShips = function getCellsOfSunkShips() {
    var cellsOfSunkShips = [];
    shipSegments.forEach(function (_ref17, index) {
      var _ref18 = _slicedToArray(_ref17, 2),
        start = _ref18[0],
        end = _ref18[1];
      var ship = ships[index];
      if (ship.isSunk()) {
        var _start = _slicedToArray(start, 2),
          startX = _start[0],
          startY = _start[1];
        var _end = _slicedToArray(end, 2),
          endX = _end[0],
          endY = _end[1];
        var isHorizontal = startY !== endY;
        for (var i = 0; i < ship.length; i++) {
          var cell = isHorizontal ? [startX, startY + i] : [startX + i, startY];
          cellsOfSunkShips.push(cell);
        }
      }
    });
    return cellsOfSunkShips;
  };
  var isValidDragPlacement = function isValidDragPlacement(cellsArray, startPos, endPos, orientation) {
    var _startPos$split$map = startPos.split(",").map(Number),
      _startPos$split$map2 = _slicedToArray(_startPos$split$map, 2),
      startX = _startPos$split$map2[0],
      startY = _startPos$split$map2[1];
    var _endPos$split$map = endPos.split(",").map(Number),
      _endPos$split$map2 = _slicedToArray(_endPos$split$map, 2),
      endX = _endPos$split$map2[0],
      endY = _endPos$split$map2[1];
    for (var i = 0; i < cellsArray.length; i++) {
      var _cellsArray$i$split$m = cellsArray[i].split(",").map(Number),
        _cellsArray$i$split$m2 = _slicedToArray(_cellsArray$i$split$m, 2),
        x = _cellsArray$i$split$m2[0],
        y = _cellsArray$i$split$m2[1];
      if (checkCell(x, y) && !isWithingDraggedShip(x, y, startX, startY, endX, endY, orientation)) {
        console.log("Invalid due to existing ship at", x, y);
        return false;
      }
      var surroundingCells = [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y], [x + 1, y + 1], [x + 1, y - 1], [x - 1, y + 1], [x - 1, y - 1]];
      for (var j = 0; j < surroundingCells.length; j++) {
        var _surroundingCells$j = _slicedToArray(surroundingCells[j], 2),
          sx = _surroundingCells$j[0],
          sy = _surroundingCells$j[1];
        if (checkCell(sx, sy) && !isWithingDraggedShip(sx, sy, startX, startY, endX, endY, orientation)) {
          console.log("invalid due to proximity to another ship at", sx, sy);
          return false;
        }
      }
    }
    return true;
  };
  var placeShipDragAndDrop = function placeShipDragAndDrop(ship, _ref19, orientation) {
    var _ref20 = _slicedToArray(_ref19, 2),
      x = _ref20[0],
      y = _ref20[1];
    var endX = x;
    var endY = y;
    if (orientation === "horizontal") {
      endY = y + ship.length - 1;
      if (endY >= 10) return false;
    } else if (orientation === "vertical") {
      endX = x + ship.length - 1;
      if (endX >= 10) return false;
    }
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        if (board[i][j] === ship) {
          board[i][j] = null;
        }
      }
    }
    var shipIndex = ships.indexOf(ship);
    if (shipIndex > -1) {
      ships.splice(shipIndex, 1);
      shipSegments.splice(shipIndex, 1);
    }
    if (orientation === "horizontal") {
      for (var _i3 = 0; _i3 < ship.length; _i3++) {
        board[x][y + _i3] = ship;
      }
      endY = y + ship.length - 1;
    } else if (orientation === "vertical") {
      for (var _i4 = 0; _i4 < ship.length; _i4++) {
        board[x + _i4][y] = ship;
      }
      endX = x + ship.length - 1;
    }
    ships.push(ship);
    shipSegments.push([[x, y], [endX, endY]]);
    var shipImage = document.querySelector("img[data-name=\"".concat(ship.name, "\"]"));
    shipImage.dataset.startPos = "".concat(x, ",").concat(y);
    shipImage.dataset.endPos = "".concat(endX, ",").concat(endY);
    return ships.includes(ship);
  };
  var isAllShipSunk = function isAllShipSunk() {
    return ships.every(function (ship) {
      return ship.isSunk();
    });
  };
  var getMissedAttacks = function getMissedAttacks() {
    return missedAttacks;
  };
  var getHitAttacks = function getHitAttacks() {
    return hitAttacks;
  };
  var getAttackAt = function getAttackAt(_ref21) {
    var _ref22 = _slicedToArray(_ref21, 2),
      x = _ref22[0],
      y = _ref22[1];
    return attacks[x][y];
  };
  var getShipAt = function getShipAt(_ref23) {
    var _ref24 = _slicedToArray(_ref23, 2),
      x = _ref24[0],
      y = _ref24[1];
    return board[x][y];
  };
  var getShips = function getShips() {
    return ships;
  };
  var getShipSegments = function getShipSegments() {
    return shipSegments;
  };
  return {
    placeShip: placeShip,
    getShipAt: getShipAt,
    receiveAttack: receiveAttack,
    getAttackAt: getAttackAt,
    reportAttack: reportAttack,
    getMissedAttacks: getMissedAttacks,
    getHitAttacks: getHitAttacks,
    isAllShipSunk: isAllShipSunk,
    isShipSunkAt: isShipSunkAt,
    reset: reset,
    placeRandomShips: placeRandomShips,
    getShips: getShips,
    getShipSegments: getShipSegments,
    isValidPlacement: isValidPlacement,
    isValidDragPlacement: isValidDragPlacement,
    placeShipDragAndDrop: placeShipDragAndDrop,
    isValidRotation: isValidRotation,
    getCellsOfSunkShips: getCellsOfSunkShips
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _aiPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aiPlayer */ "./src/aiPlayer.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _domModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domModule */ "./src/domModule.js");




var select = function select(selector) {
  return document.querySelector(selector);
};
var gameLoop = function gameLoop() {
  var humanGameboard;
  var aiGameboard;
  var ai;
  var humanContainer = select(".human .game-container");
  var aiContainer = select(".ai .game-container");
  var gameState = {
    currentPlayer: "human",
    isGameOver: false,
    lastAttackResult: null,
    lastPlayer: null,
    loggedShips: {
      human: new Set(),
      ai: new Set()
    }
  };
  var initializeGame = function initializeGame() {
    humanGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    aiGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    ai = (0,_aiPlayer__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var humanShips = [(0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(5, "carrier"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(4, "battleship"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3, "destroyer"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3, "submarine"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(2, "patrolboat")];
    var aiShips = [(0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(5, "carrier"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(4, "battleship"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3, "destroyer"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3, "submarine"), (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(2, "patrolboat")];
    humanGameboard.placeRandomShips(humanGameboard, humanShips);
    aiGameboard.placeRandomShips(aiGameboard, aiShips);
    (0,_domModule__WEBPACK_IMPORTED_MODULE_3__.renderBoard)(humanContainer, aiContainer, humanGameboard, aiGameboard);
    gameState.currentPlayer = "human";
    gameState.isGameOver = false;
    gameState.lastAttackResult = null;
    gameState.lastPlayer = null;
    gameState.loggedShips = {
      human: new Set(),
      ai: new Set()
    };
  };
  var changeTurn = function changeTurn() {
    gameState.currentPlayer = gameState.currentPlayer === "human" ? "ai" : "human";
  };
  var checkGameOver = function checkGameOver() {
    if (humanGameboard.isAllShipSunk() || aiGameboard.isAllShipSunk()) {
      gameState.isGameOver = true;
    }
  };
  var getHumanGameboard = function getHumanGameboard() {
    return humanGameboard;
  };
  var getAiGameboard = function getAiGameboard() {
    return aiGameboard;
  };
  var getAi = function getAi() {
    return ai;
  };
  return {
    initializeGame: initializeGame,
    getHumanGameboard: getHumanGameboard,
    getAiGameboard: getAiGameboard,
    gameState: gameState,
    changeTurn: changeTurn,
    checkGameOver: checkGameOver,
    getAi: getAi
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLoop);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(length, name) {
  var hits = 0;
  var hit = function hit() {
    if (hits <= length) {
      hits++;
    }
  };
  var getHits = function getHits() {
    return hits;
  };
  var isSunk = function isSunk() {
    return hits >= length;
  };
  return {
    length: length,
    getHits: getHits,
    hit: hit,
    isSunk: isSunk,
    name: name
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* reset  */
*,
*::before,
*::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
input,
button,
textarea,
select {
  font: inherit;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* general  */

:root {
  --land: #001f3f;
  --bg-color: #e0e5ec;
  --white: #fff;
}

:root {
  --shadow-color: 227deg 19% 34%;
  --shadow-elevation-low: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
  --shadow-elevation-medium: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
  --shadow-elevation-high: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    1.5px 2.9px 3.7px -0.4px hsl(var(--shadow-color) / 0.34),
    2.7px 5.4px 6.8px -0.7px hsl(var(--shadow-color) / 0.34),
    4.5px 8.9px 11.2px -1.1px hsl(var(--shadow-color) / 0.34),
    7.1px 14.3px 18px -1.4px hsl(var(--shadow-color) / 0.34),
    11.2px 22.3px 28.1px -1.8px hsl(var(--shadow-color) / 0.34),
    17px 33.9px 42.7px -2.1px hsl(var(--shadow-color) / 0.34),
    25px 50px 62.9px -2.5px hsl(var(--shadow-color) / 0.34);
}

body {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}
body::-webkit-scrollbar {
  width: 12px;
}

body::-webkit-scrollbar-track {
  background: transparent;
}

body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

body::-webkit-scrollbar-thumb:hover {
  background: #555;
}

main {
  display: grid;
  justify-items: center;
  margin-bottom: var(--footer-height);
}

header .logo {
  width: clamp(150px, 20vw, 250px);
}

.headerWrapper {
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  height: var(--header-height);
  background: white;
}

header {
  max-width: 1200px;
  min-width: 400px;
  width: 100%;
  position: fixed;
  height: max-content;
  top: 0;
  padding: 10px 20px;
  border-bottom: 2px solid var(--bg-color);
  background: white;
}

.intro p {
  font-size: clamp(1rem, 1vw, 1.3rem);
}
.wiki-link {
  /* text-decoration: none; */
  cursor: pointer;
  font-weight: 600;
  color: #ff6b6b;
}

.wiki-link:hover {
  text-decoration: none;
}

.container {
  width: 100%;
  max-width: 1200px;
  min-width: 300px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: var(--header-height);
  margin-bottom: var(--footer-height);
  /* background-color: var(--bg-color); */
}

.gameStatus {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 0 10px;
  width: 100%;
  width: var(--game-width);
  min-width: 300px;
}

h2 {
  font-size: clamp(1.5rem, 3vw, 1.8rem);
}

.gameLog {
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 600;
}

.game {
  display: flex;

  gap: 50px;
  padding: 0 10px;
}

/* gameboard  */

.game-container {
  width: 100%;
  display: grid;
  grid-template:
    ".... col-indices " 20px
    "row-indices board " 1fr/ 20px 1fr;
  gap: clamp(5px, 0.5vw, 10px);
  padding: clamp(5px, 1.2vw, 20px);
  border-radius: 15px;
  position: relative;
  background-color: var(--land);
  box-shadow: var(--shadow-elevation-medium);
}

.row-indices {
  grid-area: row-indices;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.index {
  width: clamp(20px, 3vw, 45px);
  height: clamp(20px, 3vw, 45px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: var(--white);
}

.col-indices {
  grid-area: col-indices;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.board {
  grid-area: board;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  position: relative;
  border-collapse: collapse;
  background-color: var(--white);
}

.ship {
  position: absolute;
  will-change: transform;
  transition: width 0.2s ease, height 0.2s ease;
}

.ship.ai-ship {
  /* opacity: 0; */
  pointer-events: none;
}
.ship.ai-ship.sink {
  opacity: 1;

  pointer-events: auto;
}

.ship.sink {
  fill: #000000;
  filter: grayscale(100%);
}

.cell {
  border: 1px solid #ccc;
  position: relative;
}

.cell.miss::after {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: slategray;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cell.hit::before,
.cell.hit::after {
  content: "";
  display: block;
  width: 2px;
  height: 100%;
  background-color: var(--land);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.cell.hit::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.cell.hit::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.human,
.ai {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 1.5vw, 20px);
}

.player {
  font-size: clamp(1.2rem, 2vw, 1.7rem);
}
.options {
  justify-self: center;
  align-self: flex-start;
  align-items: center;
  display: flex;
  gap: clamp(10px, 1.5vw, 20px);
}
.options button {
  padding: 4px 8px;
  width: clamp(100px, 10vw, 140px);
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  border: none;
  border-radius: 5px;
  background: #1e3d59;
  color: white;
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.options button::before,
.options button::after {
  content: "";
  position: absolute;
  height: 2px;
  width: 0;
  background: hotpink;
  transition: width 0.3s ease;
}

.options button::before {
  top: 0;
  left: 0;
}

.options button::after {
  bottom: 0;
  right: 0;
}

.options button:hover {
  box-shadow: 4px 4px 6px rgba(116, 125, 136, 0.5),
    -4px -4px 6px rgba(255, 255, 255, 0.5);
  background: transparent;
  color: #001f3f;
}

.options button:hover::before,
.options button:hover::after {
  width: 100%;
}

.sound {
  width: clamp(1.5rem, 3vw, 2.5rem);
  cursor: pointer;
}

.game-control {
  width: var(--game-width);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  margin-bottom: var(--header-height);
}

.intro-log {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}

.ship-log {
  display: none;
  /* display: flex; */
  flex-direction: column;
}

/* modal  */
.modal {
  display: none;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: clamp(250px, 30vw, 330px);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: start;
  gap: 10px;
}

#close-btn {
  justify-self: flex-end;
  font-size: 2rem;
  line-height: 0.5;
  cursor: pointer;
  color: #1e3d59;
}

.modal-content h2 {
  color: #1e3d59;
}
#playAgain {
  padding: 3px 10px;
  border: none;
  border-radius: 5px;
  font-size: clamp(1rem, 2vw, 1.3rem);
  background: #1e3d59;
  color: white;
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

/* media query  */

@media only screen and (max-width: 800px) {
  .game {
    flex-direction: column;
  }

  .index {
    width: clamp(20px, 8vw, 45px);
    height: clamp(20px, 8vw, 45px);
    font-size: clamp(1rem, 3vw, 1.5rem);
    color: var(--white);
  }
  .player {
    font-size: clamp(1.2rem, 5vw, 1.7rem);
  }

  .options button {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    width: clamp(100px, 20vw, 130px);
    padding: 4px 8px;
  }

  .game-container {
    padding: clamp(5px, 2vw, 20px);
  }

  .game-control {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
  .sound {
    width: clamp(1.5rem, 4vw, 2.5rem);
  }
}

@media only screen and (max-width: 500px) {
  .gameStatus {
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 0;
  }

  .gameLog {
    align-self: flex-end;
    order: 1;
    line-height: 1;
  }
  .gameStatus h2 {
    order: 2;
  }
}

@media (hover: none) {
  .options button::before,
  .options button::after {
    content: none;
  }

  .options button:focus {
    box-shadow: 4px 4px 6px rgba(116, 125, 136, 0.5),
      -4px -4px 6px rgba(255, 255, 255, 0.5);
    transform: box-shadow 0.3s ease;
  }
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,WAAW;AACX;;;EAGE,sBAAsB;AACxB;AACA;EACE,SAAS;AACX;AACA;EACE,gBAAgB;EAChB,mCAAmC;AACrC;AACA;;;;;EAKE,cAAc;EACd,eAAe;AACjB;AACA;;;;EAIE,aAAa;AACf;AACA;;;;;;;EAOE,yBAAyB;AAC3B;;AAEA,aAAa;;AAEb;EACE,eAAe;EACf,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,8BAA8B;EAC9B;;wDAEsD;EACtD;;;0DAGwD;EACxD;;;;;;;2DAOyD;AAC3D;;AAEA;EACE,SAAS;EACT,UAAU;EACV,kBAAkB;AACpB;AACA;EACE,WAAW;AACb;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,mCAAmC;AACrC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,WAAW;EACX,UAAU;EACV,aAAa;EACb,uBAAuB;EACvB,eAAe;EACf,MAAM;EACN,4BAA4B;EAC5B,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,WAAW;EACX,eAAe;EACf,mBAAmB;EACnB,MAAM;EACN,kBAAkB;EAClB,wCAAwC;EACxC,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;AACrC;AACA;EACE,2BAA2B;EAC3B,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,gBAAgB;EAChB,OAAO;EACP,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,gCAAgC;EAChC,mCAAmC;EACnC,uCAAuC;AACzC;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,SAAS;EACT,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,wBAAwB;EACxB,gBAAgB;AAClB;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,mCAAmC;EACnC,gBAAgB;AAClB;;AAEA;EACE,aAAa;;EAEb,SAAS;EACT,eAAe;AACjB;;AAEA,eAAe;;AAEf;EACE,WAAW;EACX,aAAa;EACb;;sCAEoC;EACpC,4BAA4B;EAC5B,gCAAgC;EAChC,mBAAmB;EACnB,kBAAkB;EAClB,6BAA6B;EAC7B,0CAA0C;AAC5C;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;EAC7B,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,qCAAqC;EACrC,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,kBAAkB;EAClB,yBAAyB;EACzB,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,6CAA6C;AAC/C;;AAEA;EACE,gBAAgB;EAChB,oBAAoB;AACtB;AACA;EACE,UAAU;;EAEV,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,UAAU;EACV,WAAW;EACX,2BAA2B;EAC3B,kBAAkB;EAClB,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;AAClC;;AAEA;;EAEE,WAAW;EACX,cAAc;EACd,UAAU;EACV,YAAY;EACZ,6BAA6B;EAC7B,kBAAkB;EAClB,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;AACZ;;AAEA;EACE,8CAA8C;AAChD;AACA;EACE,+CAA+C;AACjD;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,qCAAqC;AACvC;AACA;EACE,oBAAoB;EACpB,sBAAsB;EACtB,mBAAmB;EACnB,aAAa;EACb,6BAA6B;AAC/B;AACA;EACE,gBAAgB;EAChB,gCAAgC;EAChC,qCAAqC;EACrC,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,aAAa;EACb,2CAA2C;AAC7C;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA;EACE,MAAM;EACN,OAAO;AACT;;AAEA;EACE,SAAS;EACT,QAAQ;AACV;;AAEA;EACE;0CACwC;EACxC,uBAAuB;EACvB,cAAc;AAChB;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,iCAAiC;EACjC,eAAe;AACjB;;AAEA;EACE,wBAAwB;EACxB,aAAa;EACb,8BAA8B;EAC9B,SAAS;;EAET,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA,WAAW;AACX;EACE,aAAa;EACb,eAAe;EACf,UAAU;EACV,OAAO;EACP,MAAM;EACN,WAAW;EACX,YAAY;EACZ,cAAc;EACd,oCAAoC;AACtC;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,gCAAgC;EAChC,mBAAmB;EACnB,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,oBAAoB;EACpB,SAAS;AACX;;AAEA;EACE,sBAAsB;EACtB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;AACA;EACE,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,mCAAmC;EACnC,mBAAmB;EACnB,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,aAAa;EACb,2CAA2C;AAC7C;;AAEA,iBAAiB;;AAEjB;EACE;IACE,sBAAsB;EACxB;;EAEA;IACE,6BAA6B;IAC7B,8BAA8B;IAC9B,mCAAmC;IACnC,mBAAmB;EACrB;EACA;IACE,qCAAqC;EACvC;;EAEA;IACE,qCAAqC;IACrC,gCAAgC;IAChC,gBAAgB;EAClB;;EAEA;IACE,8BAA8B;EAChC;;EAEA;IACE,0BAA0B;IAC1B,SAAS;IACT,gBAAgB;EAClB;EACA;IACE,iCAAiC;EACnC;AACF;;AAEA;EACE;IACE,sBAAsB;IACtB,gBAAgB;IAChB,gBAAgB;EAClB;;EAEA;IACE,oBAAoB;IACpB,QAAQ;IACR,cAAc;EAChB;EACA;IACE,QAAQ;EACV;AACF;;AAEA;EACE;;IAEE,aAAa;EACf;;EAEA;IACE;4CACwC;IACxC,+BAA+B;EACjC;AACF","sourcesContent":["/* reset  */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n* {\n  margin: 0;\n}\nbody {\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n  display: block;\n  max-width: 100%;\n}\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  overflow-wrap: break-word;\n}\n\n/* general  */\n\n:root {\n  --land: #001f3f;\n  --bg-color: #e0e5ec;\n  --white: #fff;\n}\n\n:root {\n  --shadow-color: 227deg 19% 34%;\n  --shadow-elevation-low: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),\n    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),\n    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);\n  --shadow-elevation-medium: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),\n    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),\n    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),\n    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);\n  --shadow-elevation-high: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),\n    1.5px 2.9px 3.7px -0.4px hsl(var(--shadow-color) / 0.34),\n    2.7px 5.4px 6.8px -0.7px hsl(var(--shadow-color) / 0.34),\n    4.5px 8.9px 11.2px -1.1px hsl(var(--shadow-color) / 0.34),\n    7.1px 14.3px 18px -1.4px hsl(var(--shadow-color) / 0.34),\n    11.2px 22.3px 28.1px -1.8px hsl(var(--shadow-color) / 0.34),\n    17px 33.9px 42.7px -2.1px hsl(var(--shadow-color) / 0.34),\n    25px 50px 62.9px -2.5px hsl(var(--shadow-color) / 0.34);\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  overflow-y: scroll;\n}\nbody::-webkit-scrollbar {\n  width: 12px;\n}\n\nbody::-webkit-scrollbar-track {\n  background: transparent;\n}\n\nbody::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 20px;\n}\n\nbody::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\nmain {\n  display: grid;\n  justify-items: center;\n  margin-bottom: var(--footer-height);\n}\n\nheader .logo {\n  width: clamp(150px, 20vw, 250px);\n}\n\n.headerWrapper {\n  width: 100%;\n  z-index: 1;\n  display: flex;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  height: var(--header-height);\n  background: white;\n}\n\nheader {\n  max-width: 1200px;\n  min-width: 400px;\n  width: 100%;\n  position: fixed;\n  height: max-content;\n  top: 0;\n  padding: 10px 20px;\n  border-bottom: 2px solid var(--bg-color);\n  background: white;\n}\n\n.intro p {\n  font-size: clamp(1rem, 1vw, 1.3rem);\n}\n.wiki-link {\n  /* text-decoration: none; */\n  cursor: pointer;\n  font-weight: 600;\n  color: #ff6b6b;\n}\n\n.wiki-link:hover {\n  text-decoration: none;\n}\n\n.container {\n  width: 100%;\n  max-width: 1200px;\n  min-width: 300px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  margin-top: var(--header-height);\n  margin-bottom: var(--footer-height);\n  /* background-color: var(--bg-color); */\n}\n\n.gameStatus {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-top: 30px;\n  margin-bottom: 10px;\n  padding: 0 10px;\n  width: 100%;\n  width: var(--game-width);\n  min-width: 300px;\n}\n\nh2 {\n  font-size: clamp(1.5rem, 3vw, 1.8rem);\n}\n\n.gameLog {\n  display: flex;\n  flex-direction: column;\n  align-items: end;\n  font-size: clamp(1rem, 2vw, 1.3rem);\n  font-weight: 600;\n}\n\n.game {\n  display: flex;\n\n  gap: 50px;\n  padding: 0 10px;\n}\n\n/* gameboard  */\n\n.game-container {\n  width: 100%;\n  display: grid;\n  grid-template:\n    \".... col-indices \" 20px\n    \"row-indices board \" 1fr/ 20px 1fr;\n  gap: clamp(5px, 0.5vw, 10px);\n  padding: clamp(5px, 1.2vw, 20px);\n  border-radius: 15px;\n  position: relative;\n  background-color: var(--land);\n  box-shadow: var(--shadow-elevation-medium);\n}\n\n.row-indices {\n  grid-area: row-indices;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.index {\n  width: clamp(20px, 3vw, 45px);\n  height: clamp(20px, 3vw, 45px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: clamp(1rem, 1.5vw, 1.5rem);\n  color: var(--white);\n}\n\n.col-indices {\n  grid-area: col-indices;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.board {\n  grid-area: board;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  position: relative;\n  border-collapse: collapse;\n  background-color: var(--white);\n}\n\n.ship {\n  position: absolute;\n  will-change: transform;\n  transition: width 0.2s ease, height 0.2s ease;\n}\n\n.ship.ai-ship {\n  /* opacity: 0; */\n  pointer-events: none;\n}\n.ship.ai-ship.sink {\n  opacity: 1;\n\n  pointer-events: auto;\n}\n\n.ship.sink {\n  fill: #000000;\n  filter: grayscale(100%);\n}\n\n.cell {\n  border: 1px solid #ccc;\n  position: relative;\n}\n\n.cell.miss::after {\n  content: \"\";\n  display: block;\n  width: 25%;\n  height: 25%;\n  background-color: slategray;\n  border-radius: 50%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.cell.hit::before,\n.cell.hit::after {\n  content: \"\";\n  display: block;\n  width: 2px;\n  height: 100%;\n  background-color: var(--land);\n  border-radius: 50%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n}\n\n.cell.hit::before {\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n.cell.hit::after {\n  transform: translate(-50%, -50%) rotate(-45deg);\n}\n\n.human,\n.ai {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: clamp(10px, 1.5vw, 20px);\n}\n\n.player {\n  font-size: clamp(1.2rem, 2vw, 1.7rem);\n}\n.options {\n  justify-self: center;\n  align-self: flex-start;\n  align-items: center;\n  display: flex;\n  gap: clamp(10px, 1.5vw, 20px);\n}\n.options button {\n  padding: 4px 8px;\n  width: clamp(100px, 10vw, 140px);\n  font-size: clamp(1rem, 1.5vw, 1.5rem);\n  border: none;\n  border-radius: 5px;\n  background: #1e3d59;\n  color: white;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  outline: none;\n  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);\n}\n\n.options button::before,\n.options button::after {\n  content: \"\";\n  position: absolute;\n  height: 2px;\n  width: 0;\n  background: hotpink;\n  transition: width 0.3s ease;\n}\n\n.options button::before {\n  top: 0;\n  left: 0;\n}\n\n.options button::after {\n  bottom: 0;\n  right: 0;\n}\n\n.options button:hover {\n  box-shadow: 4px 4px 6px rgba(116, 125, 136, 0.5),\n    -4px -4px 6px rgba(255, 255, 255, 0.5);\n  background: transparent;\n  color: #001f3f;\n}\n\n.options button:hover::before,\n.options button:hover::after {\n  width: 100%;\n}\n\n.sound {\n  width: clamp(1.5rem, 3vw, 2.5rem);\n  cursor: pointer;\n}\n\n.game-control {\n  width: var(--game-width);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 50px;\n\n  margin-bottom: var(--header-height);\n}\n\n.intro-log {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 0 10px;\n}\n\n.ship-log {\n  display: none;\n  /* display: flex; */\n  flex-direction: column;\n}\n\n/* modal  */\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 3;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n.modal-content {\n  background-color: #fefefe;\n  margin: auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: clamp(250px, 30vw, 330px);\n  border-radius: 10px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: grid;\n  justify-items: start;\n  gap: 10px;\n}\n\n#close-btn {\n  justify-self: flex-end;\n  font-size: 2rem;\n  line-height: 0.5;\n  cursor: pointer;\n  color: #1e3d59;\n}\n\n.modal-content h2 {\n  color: #1e3d59;\n}\n#playAgain {\n  padding: 3px 10px;\n  border: none;\n  border-radius: 5px;\n  font-size: clamp(1rem, 2vw, 1.3rem);\n  background: #1e3d59;\n  color: white;\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  outline: none;\n  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);\n}\n\n/* media query  */\n\n@media only screen and (max-width: 800px) {\n  .game {\n    flex-direction: column;\n  }\n\n  .index {\n    width: clamp(20px, 8vw, 45px);\n    height: clamp(20px, 8vw, 45px);\n    font-size: clamp(1rem, 3vw, 1.5rem);\n    color: var(--white);\n  }\n  .player {\n    font-size: clamp(1.2rem, 5vw, 1.7rem);\n  }\n\n  .options button {\n    font-size: clamp(1.1rem, 3vw, 1.5rem);\n    width: clamp(100px, 20vw, 130px);\n    padding: 4px 8px;\n  }\n\n  .game-container {\n    padding: clamp(5px, 2vw, 20px);\n  }\n\n  .game-control {\n    grid-template-columns: 1fr;\n    gap: 20px;\n    margin-top: 30px;\n  }\n  .sound {\n    width: clamp(1.5rem, 4vw, 2.5rem);\n  }\n}\n\n@media only screen and (max-width: 500px) {\n  .gameStatus {\n    flex-direction: column;\n    margin-top: 20px;\n    margin-bottom: 0;\n  }\n\n  .gameLog {\n    align-self: flex-end;\n    order: 1;\n    line-height: 1;\n  }\n  .gameStatus h2 {\n    order: 2;\n  }\n}\n\n@media (hover: none) {\n  .options button::before,\n  .options button::after {\n    content: none;\n  }\n\n  .options button:focus {\n    box-shadow: 4px 4px 6px rgba(116, 125, 136, 0.5),\n      -4px -4px 6px rgba(255, 255, 255, 0.5);\n    transform: box-shadow 0.3s ease;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/battleship-4-h.svg":
/*!***************************************!*\
  !*** ./src/assets/battleship-4-h.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/battleship-4-h.svg";

/***/ }),

/***/ "./src/assets/battleship-4-v.svg":
/*!***************************************!*\
  !*** ./src/assets/battleship-4-v.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/battleship-4-v.svg";

/***/ }),

/***/ "./src/assets/carrier-5-h.svg":
/*!************************************!*\
  !*** ./src/assets/carrier-5-h.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/carrier-5-h.svg";

/***/ }),

/***/ "./src/assets/carrier-5-v.svg":
/*!************************************!*\
  !*** ./src/assets/carrier-5-v.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/carrier-5-v.svg";

/***/ }),

/***/ "./src/assets/destroyer-3-h.svg":
/*!**************************************!*\
  !*** ./src/assets/destroyer-3-h.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/destroyer-3-h.svg";

/***/ }),

/***/ "./src/assets/destroyer-3-v.svg":
/*!**************************************!*\
  !*** ./src/assets/destroyer-3-v.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/destroyer-3-v.svg";

/***/ }),

/***/ "./src/assets/hit.mp3":
/*!****************************!*\
  !*** ./src/assets/hit.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/hit.mp3";

/***/ }),

/***/ "./src/assets/miss.mp3":
/*!*****************************!*\
  !*** ./src/assets/miss.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/miss.mp3";

/***/ }),

/***/ "./src/assets/patrolboat-2-h.svg":
/*!***************************************!*\
  !*** ./src/assets/patrolboat-2-h.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/patrolboat-2-h.svg";

/***/ }),

/***/ "./src/assets/patrolboat-2-v.svg":
/*!***************************************!*\
  !*** ./src/assets/patrolboat-2-v.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/patrolboat-2-v.svg";

/***/ }),

/***/ "./src/assets/sound-off.svg":
/*!**********************************!*\
  !*** ./src/assets/sound-off.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/sound-off.svg";

/***/ }),

/***/ "./src/assets/sound-on.svg":
/*!*********************************!*\
  !*** ./src/assets/sound-on.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/sound-on.svg";

/***/ }),

/***/ "./src/assets/submarine-3-h.svg":
/*!**************************************!*\
  !*** ./src/assets/submarine-3-h.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/submarine-3-h.svg";

/***/ }),

/***/ "./src/assets/submarine-3-v.svg":
/*!**************************************!*\
  !*** ./src/assets/submarine-3-v.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/submarine-3-v.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _domModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domModule */ "./src/domModule.js");
/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameloop */ "./src/gameloop.js");
/* harmony import */ var _assets_miss_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/miss.mp3 */ "./src/assets/miss.mp3");
/* harmony import */ var _assets_hit_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/hit.mp3 */ "./src/assets/hit.mp3");
/* harmony import */ var _assets_sound_on_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/sound-on.svg */ "./src/assets/sound-on.svg");
/* harmony import */ var _assets_sound_off_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/sound-off.svg */ "./src/assets/sound-off.svg");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var select = function select(selector) {
  return document.querySelector(selector);
};
var create = function create(element) {
  return document.createElement(element);
};
var updateContainerMargin = function updateContainerMargin() {
  var header = select("header");
  var game = select(".game");
  var headerHeight = header.offsetHeight;
  var gameWidth = game.offsetWidth;
  document.documentElement.style.setProperty("--header-height", "".concat(headerHeight, "px"));
  document.documentElement.style.setProperty("--game-width", "".concat(gameWidth, "px"));
};
window.addEventListener("load", function () {
  updateContainerMargin();
  (0,_domModule__WEBPACK_IMPORTED_MODULE_1__.adjustShipSizeAndPositions)();
});
window.addEventListener("resize", function () {
  updateContainerMargin();
  (0,_domModule__WEBPACK_IMPORTED_MODULE_1__.adjustShipSizeAndPositions)();
});
var gameLog = JSON.parse(localStorage.getItem("gameLog")) || {
  humanWins: 0,
  aiWins: 0,
  lastWinner: null,
  totalGames: 0,
  updated: false
};
var updateGameLog = function updateGameLog() {
  var humanLog = select(".humanLog");
  var aiLog = select(".aiLog");
  var lastRound = select(".lastRound");
  humanLog.textContent = "You: ".concat(gameLog.humanWins, "/").concat(gameLog.totalGames);
  aiLog.textContent = "Ai: ".concat(gameLog.aiWins, "/").concat(gameLog.totalGames);
  lastRound.textContent = gameLog.lastWinner ? "".concat(gameLog.lastWinner, " won the last round.") : "No games played yet.";
};
var gameInstances = (0,_gameloop__WEBPACK_IMPORTED_MODULE_2__["default"])();
gameInstances.initializeGame();
var gameOverModal = select("#gameOverModal");
var winnerMessage = select("#winnerMessage");
var playAgainButton = select("#playAgain");
var closeBtn = select("#close-btn");
var soundOn = true;
var soundBtn = select(".sound");
soundBtn.addEventListener("click", function () {
  soundOn = !soundOn;
  soundBtn.src = soundOn ? _assets_sound_on_svg__WEBPACK_IMPORTED_MODULE_5__ : _assets_sound_off_svg__WEBPACK_IMPORTED_MODULE_6__;
});
var playSound = function playSound(effect) {
  if (soundOn) {
    var audio = new Audio(effect);
    audio.play();
  }
};
var capitalizeFirstLetter = function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var gameStateText = select(".gameMsg");
var updateGameState = function updateGameState() {
  var humanGameBoard = gameInstances.getHumanGameboard();
  var aiGameBoard = gameInstances.getAiGameboard();
  var shipLog = select(".ship-log ol");
  var message = "";
  humanGameBoard.getShips().forEach(function (ship) {
    if (ship.isSunk() && !gameInstances.gameState.loggedShips.human.has(ship.name)) {
      gameInstances.gameState.loggedShips.human.add(ship.name);
      var shipElement = select(".human-ship.".concat(ship.name));
      shipElement.classList.add("sink");
      select(".ship-log").style.display = "flex";
      var list = create("li");
      list.textContent = "AI sunk your ".concat(capitalizeFirstLetter(ship.name));
      shipLog.appendChild(list);
    }
  });
  aiGameBoard.getShips().forEach(function (ship) {
    if (ship.isSunk() && !gameInstances.gameState.loggedShips.ai.has(ship.name)) {
      gameInstances.gameState.loggedShips.ai.add(ship.name);
      var shipElement = select(".ai-ship.".concat(ship.name));
      shipElement.classList.add("sink");
      select(".ship-log").style.display = "flex";
      var list = create("li");
      list.textContent = "You sunk Ai's ".concat(capitalizeFirstLetter(ship.name));
      shipLog.appendChild(list);
    }
  });
  if (!gameInstances.gameState.isGameOver) {
    message = gameInstances.gameState.currentPlayer === "human" ? "Your turn." : "AI's turn. Please wait!";
  } else {
    var winner = null;
    if (humanGameBoard.isAllShipSunk()) {
      winner = "AI";
      gameLog.aiWins++;
      message = "Game over. AI wins!";
    } else if (aiGameBoard.isAllShipSunk()) {
      winner = "You";
      gameLog.humanWins++;
      message = "Game over. You won!";
    }
    gameLog.lastWinner = winner;
    gameLog.totalGames++;
    localStorage.setItem("gameLog", JSON.stringify(gameLog));
    updateGameLog();
    winnerMessage.textContent = message;
    gameOverModal.style.display = "block";
  }
  gameStateText.textContent = message;
};
var startGame = function startGame() {
  var aiBoard = select(".ai .board");
  var humanTurn = function humanTurn(e) {
    if (e.target.classList.contains("cell") && e.target.classList.contains("hit") || e.target.classList.contains("miss")) {
      return;
    }
    if (e.target.classList.contains("cell")) {
      var _e$target$dataset$pos = e.target.dataset.pos.split(",").map(Number),
        _e$target$dataset$pos2 = _slicedToArray(_e$target$dataset$pos, 2),
        x = _e$target$dataset$pos2[0],
        y = _e$target$dataset$pos2[1];
      gameInstances.getAiGameboard().receiveAttack([x, y]);
      var result = gameInstances.getAiGameboard().reportAttack([x, y]);
      playSound(result === "hit" ? _assets_hit_mp3__WEBPACK_IMPORTED_MODULE_4__ : _assets_miss_mp3__WEBPACK_IMPORTED_MODULE_3__);
      e.target.classList.add(result === "hit" ? "hit" : "miss");
      gameInstances.gameState.lastAttackResult = result;
      gameInstances.gameState.lastPlayer = "human";
      gameInstances.checkGameOver();
      gameInstances.changeTurn();
      updateGameState();
      aiBoard.removeEventListener("click", humanTurn);
      if (!gameInstances.gameState.isGameOver) {
        setTimeout(aiTurn, 200);
      }
    }
  };
  var aiTurn = function aiTurn() {
    gameInstances.getAi().aiAttack(gameInstances.getHumanGameboard());
    var lastMove = gameInstances.getAi().getMoves().slice(-1)[0];
    var result = gameInstances.getHumanGameboard().reportAttack(lastMove);
    var attackedCell = select("[data-pos = \"".concat(lastMove.join(","), "\"]"));
    attackedCell.classList.add(result === "hit" ? "hit" : "miss");
    playSound(result === "hit" ? _assets_hit_mp3__WEBPACK_IMPORTED_MODULE_4__ : _assets_miss_mp3__WEBPACK_IMPORTED_MODULE_3__);
    gameInstances.gameState.lastAttackResult = result;
    gameInstances.gameState.lastPlayer = "ai";
    gameInstances.checkGameOver();
    gameInstances.changeTurn();
    updateGameState();
    if (!gameInstances.gameState.isGameOver) {
      aiBoard.addEventListener("click", humanTurn);
    }
  };
  if (!gameInstances.gameState.isGameOver) {
    if (gameInstances.gameState.currentPlayer === "human") {
      aiBoard.addEventListener("click", humanTurn);
    } else {
      setTimeout(aiTurn, 200);
    }
  } else {
    aiBoard.removeEventListener("click", humanTurn);
  }
};
var humanContainer = select(".human .game-container");
var aiContainer = select(".ai .game-container");
var randomizeButton = select(".randomize");
randomizeButton.addEventListener("click", function () {
  humanContainer.innerHTML = "";
  aiContainer.innerHTML = "";
  gameInstances.initializeGame();
});
var startButton = select(".start-reset");
startButton.addEventListener("click", function () {
  if (startButton.dataset.action === "start") {
    startButton.dataset.action = "reset";
    var boardDiv = select(".human .board");
    (0,_domModule__WEBPACK_IMPORTED_MODULE_1__.removeDragAndDropEvents)(boardDiv);
    randomizeButton.disabled = true;
    startButton.textContent = "Reset";
    startGame();
  } else if (startButton.dataset.action === "reset") {
    startButton.dataset.action = "start";
    randomizeButton.disabled = false;
    startButton.textContent = "Start";
    humanContainer.innerHTML = "";
    aiContainer.innerHTML = "";
    var shipLog = select(".ship-log ol");
    shipLog.innerHTML = "";
    select(".ship-log").style.display = "none";
    gameStateText.textContent = "Arrange the ships.";
    gameInstances.initializeGame();
  }
});
playAgainButton.addEventListener("click", function () {
  gameOverModal.style.display = "none";
  startButton.click();
});
closeBtn.addEventListener("click", function () {
  gameOverModal.style.display = "none";
  startButton.click();
});
updateGameLog();
})();

/******/ })()
;
//# sourceMappingURL=bundle00211633451a3efb9741.js.map