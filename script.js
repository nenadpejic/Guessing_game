// DOM
let divCardTable = document.querySelector("#cardTable");
let tableInstructionsTable = document.querySelector("table");
let spanJsSuccessPercentage = document.querySelector("#jsSuccessPercentage");

// Global variables
let isCardReady = true;
let rndmNum = 0;
let currentNum = 0;
let numTries = 0;
let instruction = "none";

// create a random number 1 - 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
};
rndmNum = getRandomNumber();
console.log(rndmNum);

// reset
function reset() {
  numTries = 0;

  divCardTable.querySelectorAll("div").forEach(card => {
    card.classList.remove("fliped");
    card.classList.remove("found");
  });

  rndmNum = getRandomNumber();
  console.log(rndmNum);

  let tds = Array.from(tableInstructionsTable.querySelectorAll("tr"));
  tds.shift();
  tds.forEach(td => {
    tableInstructionsTable.removeChild(td);
  })
}

// saveRound
function saveRound(result) {
  let results = JSON.parse(localStorage.getItem("results"));
  if (results === null) {
    results = [];
  }
  results.push(result);
  localStorage.setItem("results", JSON.stringify(results));
}

// getSuccess
function getSuccessPercentage() {
  let arr = JSON.parse(localStorage.getItem("results"));
  let ctr = 0;
  arr.forEach(elem => {
    if (elem === "victory") {
      ctr++;
    }
  })
  return Math.round((ctr / arr.length) * 100);
}

// saveSuccessPercentage
function saveSuccessPercentage() {
  localStorage.setItem("successPercentage", getSuccessPercentage());
}

// printSuccessPercentage
function printSuccessPercentage() {
  let successPercentage = localStorage.getItem("successPercentage");
  if (successPercentage) {
    spanJsSuccessPercentage.textContent = `${successPercentage}%`;
  }
}
printSuccessPercentage();

// cardTable functionality
divCardTable.addEventListener("click", function runGame(event) {
  let card = event.target;

  if (card.className === "card" && isCardReady) {
    // get currentNum
    currentNum = Number(card.id.slice(2));

    // set card class to fliped or found
    if (currentNum !== rndmNum) {
      card.classList.add("fliped");
    } else {
      card.classList.add("found");
    }

    // increase counter
    numTries++;

    // add tr to instructions table
    if (numTries < 7 && currentNum !== rndmNum) {
      let tr = document.createElement("tr");
      for (let i = 0; i < 3; i++) {
        let td = document.createElement("td");
        if (i === 0) {
          td.textContent = numTries;
        } else if (i === 1) {
          if (rndmNum < currentNum) {
            instruction = "smaller";
            td.textContent = `The number is smaller than ${currentNum}`;
          } else {
            instruction = "larger";
            td.textContent = `The number is larger than ${currentNum}`;
          }
        } else {
          td.textContent = `${7 - numTries} tries`;
        }
        tr.appendChild(td);
      }
      tableInstructionsTable.appendChild(tr);
    }

    if (currentNum === rndmNum) {
      // Victory
      isCardReady = false;
      saveRound("victory");
      saveSuccessPercentage();
      printSuccessPercentage();
      setTimeout(() => {
        alert(`Victory! The number was ${rndmNum}`);
        reset();
        isCardReady = true;
      }, 100);

    } else if (numTries >= 7) {
      // Defeat
      isCardReady = false;
      saveRound("defeat");
      saveSuccessPercentage();
      printSuccessPercentage();
      setTimeout(() => {
        alert(`Game over! The number was ${rndmNum}`);
        reset();
        isCardReady = true;
      }, 100);
    }
  }
});
