"use strict";

// DOM elements
const shortenBtn = document.getElementById("shorten-btn");
const urlInput = document.getElementById("url-input");
const resultsContainer = document.getElementById("shorten-results");

// Utility to generate random 6-character code
function generateCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Load existing links from localStorage
const urlMap = JSON.parse(localStorage.getItem("shortLinks") || "{}");

// Render all saved links on page load
function renderLinks() {
  resultsContainer.innerHTML = "";
  for (const code in urlMap) {
    addResultCard(urlMap[code], code);
  }
}

// Add a single result card
function addResultCard(longUrl, code) {
  const shortUrl = `${location.origin}/#${code}`;
  const div = document.createElement("div");
  div.className = "c-shorten-result";
  div.innerHTML = `
    <p>${longUrl}</p>
    <p>${shortUrl}</p>
    <button onclick="navigator.clipboard.writeText('${shortUrl}')">Copy</button>
  `;
  resultsContainer.prepend(div);
}

// Handle shorten button click
shortenBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  if (!url) return alert("Please add a URL!");

  // Check for duplicate
  for (const code in urlMap) {
    if (urlMap[code] === url) {
      alert("This URL is already shortened!");
      return;
    }
  }

  const code = generateCode();
  urlMap[code] = url;
  localStorage.setItem("shortLinks", JSON.stringify(urlMap));
  addResultCard(url, code);
  urlInput.value = "";
});

// Redirect if page loaded with hash
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  if (hash && urlMap[hash]) {
    window.location.href = urlMap[hash];
  }
});

// Initial render
renderLinks();
