// DOM
let divCard;
let divBarrier = document.querySelector("#barrier");
let btnAiHelp = document.querySelector("input[value='aiHelp']");

function getCard(num) {
  return divCard = document.querySelector(`#c-${num}`);
}

function getMid(num) {
  return Math.floor(num / 2);
}

let aiGuess;

btnAiHelp.addEventListener("click", function () {
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
    }

  }, 1500)
})
