// {Selectors

const gameContainer = document.querySelector(".game-container");
const message = document.getElementsByClassName("start-message")[0];
const doodler = document.createElement("div");
const scoreBoard = document.getElementsByClassName("score")[0];

let isGameOver = false;
let currentlyPlaying = false;
let platformCount = 5;
const platformGap = 630 / 5;
let platformBottom;
let platformLeft;
let doodlerBottom;
let doodlerLeft;
let startingPoint = 65;
let score = 0;
let platforms = [];
let upTime;
let downTime;
let isFalling = true;
let isMovingLeft = false;
let leftTime;
let rightTime;

// Selectors }

// {Event handlers

document.addEventListener("keydown", startGame);

// Event handlers}

// {Functions
function startGame(e) {
  currentlyPlaying = true;
  if (e.key === "Enter" && currentlyPlaying === true && !isGameOver) {
    message.innerHTML = "";
    createPlatforms();
    createDoodler();
    currentlyPlaying = true;
    setInterval(movePlatforms, 30);
    setInterval(addDeletePlatform, 30);
    jump();
    document.addEventListener("keydown", moveDoodler);
    document.addEventListener("keyup", stopDoodler);
  }
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
    platformObject.point = 1;

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

function movePlatforms() {
  if (currentlyPlaying && doodlerBottom > 200) {
    platforms.forEach((obj) => {
      obj.bottom -= 8;
      obj.platform.style.bottom = obj.bottom + "px";
    });
  }
}
function incrementScore(obj) {
  score += obj.point;
  scoreBoard.innerHTML = score;
  obj.point = 0;
}
function addDeletePlatform() {
  platforms.forEach((obj) => {
    if (obj.bottom < 0) {
      const platform = document.createElement("div");
      let platformObject = {};
      platformObject.point = 1;

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

function jump() {
  clearInterval(downTime);
  upTime = setInterval(() => {
    doodlerBottom += 20;
    doodler.style.bottom = doodlerBottom + "px";
    if (doodlerBottom >= startingPoint + 250) {
      isFalling = true;
      fall();
    }
  }, 30);
}
function fall() {
  clearInterval(upTime);
  downTime = setInterval(() => {
    doodlerBottom -= 20;
    doodler.style.bottom = doodlerBottom + "px";
    0;
    if (doodlerBottom <= 0) {
      gameOver();
    }

    platforms.forEach((obj) => {
      if (
        doodlerBottom <= obj.bottom + 15 &&
        doodlerBottom >= obj.bottom &&
        doodlerLeft <= obj.left + 90 &&
        doodlerLeft + 80 >= obj.left &&
        isFalling
      ) {
        startingPoint = doodlerBottom;
        isFalling = false;
        incrementScore(obj);
        jump();
      }
    });
  }, 30);
}
function moveLeft() {
  isMovingLeft = true;
  leftTime = setInterval(() => {
    doodlerLeft -= 10;
    doodler.style.left = doodlerLeft + "px";
  }, 30);
}
function moveRight() {
  rightTime = setInterval(() => {
    doodlerLeft += 10;
    doodler.style.left = doodlerLeft + "px";
  }, 30);
}
function gameOver() {
  isGameOver = true;
  currentlyPlaying = false;
  clearInterval(downTime);
  clearInterval(upTime);
  clearInterval(leftTime);
  clearInterval(rightTime);
}
function moveDoodler(e) {
  if (currentlyPlaying && !isGameOver) {
    if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowLeft") {
      moveLeft();
    }
  }
}
function stopDoodler(e) {
  if (e.key === "ArrowLeft") {
    clearInterval(leftTime);
  } else if (e.key === "ArrowRight") {
    clearInterval(rightTime);
  }
}
// Functions}
