"use strict";

const adviceContent = document.getElementById("advice-text");
const adviceNumber = document.getElementById("advice-number");
const diceClick = document.getElementById("dice");

async function fetchData() {
  const apiUrl = `https://api.adviceslip.com/advice`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not Ok!!");

    const data = await response.json();

    updateAdvice(data);
  } catch (err) {
    console.error("Error Fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateAdvice(data) {
  adviceContent.textContent = `${data.slip.advice}`;
  adviceNumber.textContent = `${data.slip.id}`;

  console.log(data, data.slip.id);
}

diceClick.addEventListener("click", () => {
  fetchData();
  dice.classList.toggle("rolling");
});

// {
//    "slip": {
//        "id": 118,
//        "advice": "A common regret in life is wishing one had the courage to be ones true self."
//    }
// }

// const dice = document.querySelector(".dice");

dice.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1; // Generates random number between 1 and 6
  updateDice(randomNumber);
});

function updateDice(number) {
  const dots = document.querySelectorAll(".dice .dot");
  dots.forEach((dot) => (dot.style.display = "none")); // Hide all dots

  const visibleDots = document.querySelectorAll(
    `.dice .dot:nth-child(-n+${number})`
  );
  visibleDots.forEach((dot) => (dot.style.display = "block")); // Show the corresponding number of dots
}
