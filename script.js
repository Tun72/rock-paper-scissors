import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

const icons = [];
// Player
let playerIcon = "";
let playerDefaultScore = 0;
// select
const playerIcons = document.querySelectorAll("#player .far");
const playerChoice = document.querySelector("#playerChoice");
const playerScore = document.querySelector(".playerScore");

// event
playerIcons.forEach((icon, index) => {
  icon.addEventListener("click", iconClick);
  icons.push(icon.title);
});

// function
function iconClick(e) {
  clearSelected(playerIcons);
  e.target.classList.add("selected");
  playerIcon = e.target.title.toLowerCase();
  playerChoice.textContent = ` --- ${playerIcon}`;

  computerChoiceIcon();
}

// computer

//select
const computerIcons = document.querySelectorAll("#computer .far");
const computerChoice = document.querySelector("#computerChoice");
const computerScore = document.querySelector(".computerScore");
let computerIcon = "";
let computerDefaultScore = 0;
// function
function computerChoiceIcon() {
  clearSelected(computerIcons);
  const randomNumber = Math.floor(Math.random() * 100000) % 5;
  console.log(randomNumber);
  computerIcons[randomNumber].classList.add("selected");
  computerIcon = icons[randomNumber].toLowerCase();
  computerChoice.textContent = ` --- ${computerIcon}`;

  check();
}

// RESET

//select
const resetIcon = document.querySelector(".reset-icon");

//event
resetIcon.addEventListener("click", function () {
  reset();
  computerScore.textContent = "0";
  playerScore.textContent = "0";
});

//function
function reset() {
  clearSelected(playerIcons);
  playerChoice.textContent = ``;
  clearSelected(computerIcons);
  computerChoice.textContent = ``;
  stopConfetti();
  removeConfetti();
}

function clearSelected(elements) {
  elements.forEach((icon) => {
    icon.classList.remove("selected");
  });
}

//  game

const resultText = document.querySelector(".result-text");

function check() {
  const choice = choices[playerIcon];
  const defeat = choice.defeats;

  if (playerIcon === computerIcon) {
    resultText.textContent = "Draw !";
    stopConfetti();
  } else if (defeat.indexOf(computerIcon) > -1) {
    resultText.textContent = "Player Win !";
    startConfetti();
    playerDefaultScore++;
  } else {
    resultText.textContent = "Computer Win !";
    computerDefaultScore++;
    removeConfetti();
  }
  setScore();
}

function setScore() {
  playerScore.textContent = playerDefaultScore;
  computerScore.textContent = computerDefaultScore;
}
