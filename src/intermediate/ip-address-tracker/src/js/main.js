'use strict';

const input = document.querySelector('.search-input');
const btn = document.querySelector('.search-submit');
const ipText = document.getElementById('ip-address-info');
const locationText = document.getElementById('location-info');
const timezoneText = document.getElementById('timezone-info');
const ispText = document.getElementById('isp-info');

// -------- Random Placeholder -------- //
function randomIP() {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join('.');
}
input.placeholder = randomIP();

// Clear placeholder on focus
input.addEventListener('focus', () => {
  input.placeholder = '';
});

// Restore random placeholder if left empty
input.addEventListener('blur', () => {
  if (!input.value.trim()) input.placeholder = randomIP();
});

// -------- Leaflet Map Setup -------- //
const map = L.map('map').setView([0.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// --------- Marker icon -----------
const customIcon = L.icon({
  iconUrl: './src/assets/icon-location.svg',
  iconSize: [25, 30],
  iconAnchor: [25, 50],
  popupAnchor: [0, -45],
});

let marker = L.marker([0.5937, 78.9629], { icon: customIcon }).addTo(map);

// -------- Search Logic -------- //
async function fetchIP(ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    if (data.error) throw new Error(data.reason);
    updateUI(data);
  } catch (err) {
    alert('Could not find IP details. Please check input.');
  }
}

// Trigger search by button or Enter key
btn.addEventListener('click', handleSearch);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});

function handleSearch() {
  const ip = input.value.trim();
  if (!ip) return alert('Please enter an IP address or domain');
  fetchIP(ip);
}

// -------- UI Update with Animation -------- //
function updateUI(data) {
  animateText(ipText, data.ip || '-');
  animateText(locationText, `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`);
  animateText(timezoneText, data.timezone || '-');
  animateText(ispText, data.org || '-');

  if (data.latitude && data.longitude) {
    map.setView([data.latitude, data.longitude], 13);
    marker.setLatLng([data.latitude, data.longitude]);
  }
}

// -------- Text Animation -------- //
function animateText(element, finalText) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let current = '';
  let iteration = 0;

  // Reset text to empty
  element.textContent = '';

  const interval = setInterval(() => {
    current = finalText
      .split('')
      .map((ch, i) => {
        if (i < iteration) return finalText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    element.textContent = current;

    if (iteration >= finalText.length) {
      clearInterval(interval);
      element.textContent = finalText;
    }
    iteration += 1 / 2; // speed control
  }, 50);
}
