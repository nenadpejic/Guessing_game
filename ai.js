// DOM
let divCard;
let divBarrier = document.querySelector("#barrier");
let btnAiHelp = document.querySelector("#aiHelp");

// Global variables
let aiGuess;
let isActive = false;

function getCard(num) {
  return divCard = document.querySelector(`#c-${num}`);
}

function getMid(num) {
  return Math.floor(num / 2);
}

btnAiHelp.addEventListener("click", function () {
  if (!isActive) {
    isActive = true;
    reset()

    // toggleBarrier
    divBarrier.classList.toggle("displayNone");

    let arrAiGuess = [];
    for (let i = 1; i < 101; i++) {
      arrAiGuess.push(i);
    }

    let loop = setInterval(function () {

      aiGuess = arrAiGuess[getMid(arrAiGuess.length) - 1];
      getCard(aiGuess).click();
      console.log(arrAiGuess);
      console.log(aiGuess);
      console.log(instruction);

      if (instruction === "smaller") {
        arrAiGuess.splice(getMid(arrAiGuess.length), getMid(arrAiGuess.length) + 1)
      } else if (instruction === "larger") {
        arrAiGuess.splice(0, getMid(arrAiGuess.length))
      }

      if (aiGuess === rndmNum) {
        clearInterval(loop);
        divBarrier.classList.toggle("displayNone");
        isActive = false;
      }

    }, 1500)
  }
})
