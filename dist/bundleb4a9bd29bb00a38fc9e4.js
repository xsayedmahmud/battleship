/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/world-high.svg */ "./src/assets/world-high.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
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
  --header-footer: #ffdc00;
  --sea: #7fdbff;
  --land: #001f3f;
  --ships: #333333;
  --logo: #0c0606;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
}

main {
  height: 100vh;
  width: 100vw;

  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: var(--sea);
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header .logo {
  width: clamp(150px, 20vw, 250px);
}

.headerWrapper,
.footerWrapper {
  width: 100%;
  background-color: var(--land);
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
}

header,
footer {
  position: fixed;
  max-width: 1200px;
  min-width: 400px;
  width: 100%;
}

header {
  height: max-content;
  top: 0;
  padding: 10px;
}

.headerWrapper {
  top: 0;
  height: var(--header-height);
}

footer,
.footerWrapper {
  bottom: 0;
  height: var(--header-height);
}

footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

footer > a {
  text-decoration: none;

  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--sea);
  border-radius: 5px;
  padding: 0 10px;
}

footer > a:hover {
  background-color: var(--sea);
  color: var(--land);
}
.container {
  width: 100%;
  max-width: 1200px;
  min-width: 400px;
  flex: 1;
  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: var(--header-height);
  margin-bottom: var(--footer-height);
}

h2 {
  margin-top: 20px;
  background-color: white;
  padding: 0 10px;
  border-radius: 5px;
  color: var(--sea);
}

.game {
  display: flex;
  gap: 50px;
  border: 2px solid;
}

/* gameboard  */

.game-container {
  width: 100%;
  display: grid;
  grid-template:
    ".... col-indices " 20px
    "row-indices board " 1fr/ 20px 1fr;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  position: relative;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
}

.row-indices {
  grid-area: row-indices;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.index {
  width: clamp(20px, 3vw, 40px);
  height: clamp(20px, 3vw, 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

.col-indices {
  grid-area: col-indices;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.board {
  grid-area: board;
  display: flex;
  flex-direction: column;
}

.board-row {
  display: flex;
}

.cell {
  width: clamp(25px, 3vw, 45px);
  height: clamp(25px, 3vw, 45px);
  border: 1px solid #ccc;
  margin-right: 5px;
  margin-bottom: 5px;
}

.human,
.ai {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,WAAW;AACX;;;EAGE,sBAAsB;AACxB;AACA;EACE,SAAS;AACX;AACA;EACE,gBAAgB;EAChB,mCAAmC;AACrC;AACA;;;;;EAKE,cAAc;EACd,eAAe;AACjB;AACA;;;;EAIE,aAAa;AACf;AACA;;;;;;;EAOE,yBAAyB;AAC3B;;AAEA,aAAa;;AAEb;EACE,wBAAwB;EACxB,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,YAAY;AACd;;AAEA;EACE,aAAa;EACb,YAAY;;EAEZ,yDAAgD;EAChD,4BAA4B;EAC5B,sBAAsB;EACtB,2BAA2B;EAC3B,4BAA4B;EAC5B,4BAA4B;EAC5B,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,WAAW;EACX,6BAA6B;EAC7B,eAAe;EACf,UAAU;EACV,aAAa;EACb,uBAAuB;AACzB;;AAEA;;EAEE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,MAAM;EACN,aAAa;AACf;;AAEA;EACE,MAAM;EACN,4BAA4B;AAC9B;;AAEA;;EAEE,SAAS;EACT,4BAA4B;AAC9B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;;EAErB,mCAAmC;EACnC,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,4BAA4B;EAC5B,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,iBAAiB;EACjB,gBAAgB;EAChB,OAAO;EACP,aAAa;;EAEb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,gCAAgC;EAChC,mCAAmC;AACrC;;AAEA;EACE,gBAAgB;EAChB,uBAAuB;EACvB,eAAe;EACf,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,iBAAiB;AACnB;;AAEA,eAAe;;AAEf;EACE,WAAW;EACX,aAAa;EACb;;sCAEoC;EACpC,SAAS;EACT,uBAAuB;EACvB,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,UAAU;AACZ;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;EAC7B,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,qCAAqC;AACvC;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,8BAA8B;EAC9B,sBAAsB;EACtB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;AACX","sourcesContent":["/* reset  */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n* {\n  margin: 0;\n}\nbody {\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n  display: block;\n  max-width: 100%;\n}\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  overflow-wrap: break-word;\n}\n\n/* general  */\n\n:root {\n  --header-footer: #ffdc00;\n  --sea: #7fdbff;\n  --land: #001f3f;\n  --ships: #333333;\n  --logo: #0c0606;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n}\n\nmain {\n  height: 100vh;\n  width: 100vw;\n\n  background-image: url(\"./assets/world-high.svg\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  background-attachment: fixed;\n  background-color: var(--sea);\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nheader .logo {\n  width: clamp(150px, 20vw, 250px);\n}\n\n.headerWrapper,\n.footerWrapper {\n  width: 100%;\n  background-color: var(--land);\n  position: fixed;\n  z-index: 1;\n  display: flex;\n  justify-content: center;\n}\n\nheader,\nfooter {\n  position: fixed;\n  max-width: 1200px;\n  min-width: 400px;\n  width: 100%;\n}\n\nheader {\n  height: max-content;\n  top: 0;\n  padding: 10px;\n}\n\n.headerWrapper {\n  top: 0;\n  height: var(--header-height);\n}\n\nfooter,\n.footerWrapper {\n  bottom: 0;\n  height: var(--header-height);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nfooter > a {\n  text-decoration: none;\n\n  font-size: clamp(1rem, 2vw, 1.5rem);\n  color: var(--sea);\n  border-radius: 5px;\n  padding: 0 10px;\n}\n\nfooter > a:hover {\n  background-color: var(--sea);\n  color: var(--land);\n}\n.container {\n  width: 100%;\n  max-width: 1200px;\n  min-width: 400px;\n  flex: 1;\n  display: flex;\n\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  margin-top: var(--header-height);\n  margin-bottom: var(--footer-height);\n}\n\nh2 {\n  margin-top: 20px;\n  background-color: white;\n  padding: 0 10px;\n  border-radius: 5px;\n  color: var(--sea);\n}\n\n.game {\n  display: flex;\n  gap: 50px;\n  border: 2px solid;\n}\n\n/* gameboard  */\n\n.game-container {\n  width: 100%;\n  display: grid;\n  grid-template:\n    \".... col-indices \" 20px\n    \"row-indices board \" 1fr/ 20px 1fr;\n  gap: 10px;\n  background-color: white;\n  padding: 20px;\n  border-radius: 15px;\n  position: relative;\n}\n\n.bg-video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 3;\n}\n\n.row-indices {\n  grid-area: row-indices;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.index {\n  width: clamp(20px, 3vw, 40px);\n  height: clamp(20px, 3vw, 40px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: clamp(1rem, 1.5vw, 1.5rem);\n}\n\n.col-indices {\n  grid-area: col-indices;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.board {\n  grid-area: board;\n  display: flex;\n  flex-direction: column;\n}\n\n.board-row {\n  display: flex;\n}\n\n.cell {\n  width: clamp(25px, 3vw, 45px);\n  height: clamp(25px, 3vw, 45px);\n  border: 1px solid #ccc;\n  margin-right: 5px;\n  margin-bottom: 5px;\n}\n\n.human,\n.ai {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n}\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
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

/***/ "./src/assets/world-high.svg":
/*!***********************************!*\
  !*** ./src/assets/world-high.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/world-high.svg";

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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


// import renderBoard from "./domModule";

var select = function select(selector) {
  return document.querySelector(selector);
};
var updateContainerMargin = function updateContainerMargin() {
  var header = select("header");
  var footer = select("footer");
  var headerHeight = header.offsetHeight;
  var footerHeight = footer.offsetHeight;
  document.documentElement.style.setProperty("--header-height", "".concat(headerHeight, "px"));
  document.documentElement.style.setProperty("--footer-height", "".concat(footerHeight, "px"));
};
window.addEventListener("load", updateContainerMargin);
window.addEventListener("resize", updateContainerMargin);
var humanContainer = select(".human .game-container");
var aiContainer = select(".ai .game-container");
// renderBoard(humanContainer, aiContainer);
})();

/******/ })()
;
//# sourceMappingURL=bundleb4a9bd29bb00a38fc9e4.js.map