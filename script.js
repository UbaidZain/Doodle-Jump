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
let platforms = [];

// Selectors }

// {Event handlers
document.addEventListener("keydown", startGame);

// Event handlers}

// {Functions

// setInterval(movePlatforms, 30)

// function movePlatforms ()  {
// if (currentlyPlaying && doodler.style.bottom > )
// }

function createDoodler() {
  doodler.classList.add("doodler");
  doodler.style.left = platforms[0].style.left;
  doodler.style.bottom = 50 + 15 + "px";
  gameContainer.appendChild(doodler);
  console.log(doodler.style.bottom);
}
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    const platform = document.createElement("div");
    platform.classList.add("platform");
    platformBottom = 50 + i * platformGap;
    platform.style.bottom = platformBottom + "px";
    platformLeft = Math.random() * 410;
    platform.style.left = platformLeft + "px";
    platforms.push(platform);
    console.log(platforms);

    gameContainer.appendChild(platform);
  }
}

function startGame(e) {
  if (e.key === "Enter" && currentlyPlaying === false) {
    message.innerHTML = "";
    createPlatforms();
    createDoodler();

    currentlyPlaying = true;
  }
}
// Functions}
