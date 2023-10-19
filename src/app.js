import "./style.css";
import { renderBoard, adjustShipSizeAndPositions } from "./domModule";
import gameLoop from "./gameloop";

// import renderBoard from "./domModule";

const select = (selector) => document.querySelector(selector);
const updateContainerMargin = () => {
  const header = select("header");
  const footer = select("footer");
  const headerHeight = header.offsetHeight;
  const footerHeight = footer.offsetHeight;

  document.documentElement.style.setProperty(
    "--header-height",
    `${headerHeight}px`
  );
  document.documentElement.style.setProperty(
    "--footer-height",
    `${footerHeight}px`
  );
};

window.addEventListener("load", () => {
  updateContainerMargin();
  adjustShipSizeAndPositions();
});
window.addEventListener("resize", () => {
  updateContainerMargin();
  adjustShipSizeAndPositions();
});

const gameInstances = gameLoop();
gameInstances.initializeGame();
