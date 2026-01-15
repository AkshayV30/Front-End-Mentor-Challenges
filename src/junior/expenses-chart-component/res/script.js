"use strict";

const chart = document.getElementById("chart");

const CHART_HEIGHT = 18; // rem

// Fetch data directly from JSON
fetch("./data/data.json")
  .then((response) => response.json())
  .then((data) => renderChart(data))
  .catch((error) => console.error("Error loading data:", error));

//   rendering chart
function renderChart(data) {
  const maxAmount = Math.max(...data.map((item) => item.amount));
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase();

  data.forEach((item) => {
    const barWrapper = document.createElement("div");
    barWrapper.className = "bar-wrapper";

    const amountLabel = document.createElement("div");
    amountLabel.className = "amount";
    amountLabel.textContent = `$${item.amount}`;

    const bar = document.createElement("div");
    bar.className = "bar";

    // Height in pixels
    bar.style.height = `${(item.amount / maxAmount) * CHART_HEIGHT}rem`;

    // Color logic
    if (item.amount === maxAmount) bar.classList.add("bar--max");

    const dayLabel = document.createElement("div");
    dayLabel.className = "day";
    dayLabel.textContent = item.day;

    barWrapper.append(amountLabel, bar, dayLabel);
    chart.appendChild(barWrapper);
  });
}
