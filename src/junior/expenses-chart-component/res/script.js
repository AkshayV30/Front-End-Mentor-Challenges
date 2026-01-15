"use strict";

const chart = document.getElementById("chart");

// Fetch data directly from JSON
fetch("./../data/data.json")
  .then((response) => response.json())
  .then((data) => renderChart(data))
  .catch((error) => console.error("Error loading data:", error));

function renderChart(data) {
  const maxAmount = Math.max(...data.map((item) => item.amount));
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase();

  data.forEach((item) => {
    const barWrapper = document.createElement("div");
    barWrapper.classList.add("bar-wrapper");

    const amountLabel = document.createElement("div");
    amountLabel.classList.add("amount");
    amountLabel.textContent = `$${item.amount}`;

    const bar = document.createElement("div");
    bar.classList.add("bar");

    // Scale bar height relative to max value
    bar.style.height = `${(item.amount / maxAmount) * 100}%`;

    // Highlight current day
    if (item.day === today.slice(0, 3)) {
      bar.classList.add("active");
    }

    const dayLabel = document.createElement("div");
    dayLabel.classList.add("day");
    dayLabel.textContent = item.day;

    barWrapper.appendChild(amountLabel);
    barWrapper.appendChild(bar);
    barWrapper.appendChild(dayLabel);

    chart.appendChild(barWrapper);
  });
}
