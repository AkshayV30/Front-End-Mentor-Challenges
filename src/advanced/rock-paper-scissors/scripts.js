const choices = ["rock", "paper", "scissors"];

let score = localStorage.getItem("score")
  ? parseInt(localStorage.getItem("score"))
  : 0;

document.getElementById("score").innerText = score;

function play(userChoice) {
  const houseChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById("game").style.display = "none";
  document.getElementById("result").style.display = "block";

  document.getElementById("userPick").innerText = userChoice;
  document.getElementById("housePick").innerText = houseChoice;

  let result = "";

  if (userChoice === houseChoice) {
    result = "DRAW";
  } else if (
    (userChoice === "rock" && houseChoice === "scissors") ||
    (userChoice === "paper" && houseChoice === "rock") ||
    (userChoice === "scissors" && houseChoice === "paper")
  ) {
    result = "YOU WIN";
    score++;
  } else {
    result = "YOU LOSE";
    score--;
  }

  document.getElementById("resultText").innerText = result;

  localStorage.setItem("score", score);
  document.getElementById("score").innerText = score;
}

function resetGame() {
  document.getElementById("game").style.display = "block";
  document.getElementById("result").style.display = "none";
}
