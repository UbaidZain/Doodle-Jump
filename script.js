// {Selectors

const gameContainer = document.querySelector(".game-container");
const message = document.getElementsByClassName("start-message")[0];
const doodler = document.createElement("div");

let isGameOver = false;
let currentlyPlaying = false;
let platformCount = 5;
const platformGap = 630 / 5;
let platformBottom;
let platformLeft;
let doodlerBottom;
let doodlerLeft;
let startingPoint = 65;
let platforms = [];
// let isFalling = true;

// Selectors }

// {Event handlers

document.addEventListener("keydown", startGame);

// Event handlers}

// {Functions

function movePlatforms() {
  if (currentlyPlaying && doodlerBottom > 200) {
    platforms.forEach((obj) => {
      obj.bottom -= 4;
      obj.platform.style.bottom = obj.bottom + "px";
    });
  }
}

function addDeletePlatform() {
  platforms.forEach((obj) => {
    if (obj.bottom < 0) {
      const platform = document.createElement("div");
      let platformObject = {};
      platform.classList.add("platform");
      platformBottom = 50 + platformCount * platformGap;
      platformObject.bottom = platformBottom;
      platform.style.bottom = platformBottom + "px";
      platformLeft = Math.random() * 410;
      platformObject.left = platformLeft;
      platform.style.left = platformLeft + "px";
      platformObject.platform = platform;
      obj.platform.remove();
      platforms.shift();
      platforms.push(platformObject);
      gameContainer.appendChild(platform);
    }
  });
}

// let downTime = setInterval(() => {
//   doodlerBottom -= 20;
//   doodler.style.bottom = doodlerBottom + "px";
// }, 30);
function jump() {
  platforms.forEach((obj) => {
    if (
      doodlerBottom <= obj.bottom + 15 &&
      doodlerBottom >= obj.bottom &&
      doodlerLeft <= obj.left + 90 &&
      doodlerLeft + 80 >= obj.left
    ) {
      setInterval(() => {
        doodlerBottom += 20;
        doodler.style.bottom = doodlerBottom + "px";
      }, 30);
    }
  });
}

function createDoodler() {
  doodler.classList.add("doodler");
  doodlerLeft = platforms[0].left;
  doodler.style.left = doodlerLeft + "px";
  doodlerBottom = 50 + 15;
  doodler.style.bottom = doodlerBottom + "px";
  gameContainer.appendChild(doodler);
}
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    const platform = document.createElement("div");
    let platformObject = {};
    platform.classList.add("platform");
    platformBottom = 50 + i * platformGap;
    platformObject.bottom = platformBottom;
    platform.style.bottom = platformBottom + "px";
    platformLeft = Math.random() * 410;
    platformObject.left = platformLeft;
    platform.style.left = platformLeft + "px";
    platformObject.platform = platform;
    platforms.push(platformObject);

    gameContainer.appendChild(platform);
  }
}

function startGame(e) {
  if (e.key === "Enter" && currentlyPlaying === false) {
    message.innerHTML = "";
    createPlatforms();
    createDoodler();

    currentlyPlaying = true;
    setInterval(movePlatforms, 30);
    setInterval(addDeletePlatform, 30);
    setInterval(jump, 30);
  }
}
// Functions}
