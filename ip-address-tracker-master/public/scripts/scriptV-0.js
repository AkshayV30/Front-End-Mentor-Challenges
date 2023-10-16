"use script";

const submitButton = document.querySelector(".search-submit");
const searchInput = document.querySelector(".search-input");
const ipAddressInfo = document.getElementById("ip-address-info");
const locationInfo = document.getElementById("location-info");
const timezoneInfo = document.getElementById("timezone-info");
const ispInfo = document.getElementById("isp-info");
const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/; // Regular expression for IP addresses
const domainRegex = /^(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regular expression for domain names
let searchTerm = "";

const mapContainer = document.getElementById("map");
let coordinates = [0, 0];
let zoomLevel = 2;
let map;

//intial Map layout
// Create a Leaflet map and set the view
map = L.map(mapContainer).setView(coordinates, zoomLevel);

// Add a tile layer (base map) to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  searchTerm = searchInput.value.trim();

  if (isValidInput(searchTerm)) {
    fetchData(searchTerm);
  } else alert("Invalid IP Address or Domain Name");
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    searchTerm = searchInput.value.trim();

    if (isValidInput(searchTerm)) {
      fetchData(searchTerm);
    } else alert("Invalid IP Address or Domain Name");
  }
});

function isValidInput(inputValue) {
  return ipRegex.test(inputValue) || domainRegex.test(inputValue);
}

async function fetchData(ipAddressValue) {
 
  // const app = require("../../server");
  // const apiKey = app.locals.apiKey;
  // const apiKey = "<%= apiKey %>";
  // console.log(apiKey);

  const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddressValue}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    updateInfo(data);
    updateMap(data);

    if (!data.isp) alert("No valid ISP Found !");
    if (!data.location.city) alert("No valid City Could Be Found");
  } catch (error) {
    console.error("Error Fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateInfo(data) {
  ipAddressInfo.textContent = `${searchTerm}`;
  locationInfo.textContent = `${data.location.city}`;
  timezoneInfo.textContent = `UTC - ${data.location.timezone}`;
  ispInfo.textContent = `${data.isp}`;

  console.log("--->", data);
}

function updateMap(data) {
  // Clear existing map
  if (map) {
    map.off();
    map.remove();
  }

  const latitude = data.location.lat;
  const longitude = data.location.lng;
  coordinates = [latitude, longitude];
  zoomLevel = 10;

  // Create a Leaflet map and set the view
  map = L.map(mapContainer).setView(coordinates, zoomLevel);

  // Add a tile layer (base map) to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Define a custom icon using L.Icon class
  const customIcon = L.icon({
    iconUrl: "./img/icon-location.svg",
    iconSize: [20, 36], //   iconSize: [width, height]
    iconAnchor: [12, 75], //   iconAnchor: [anchorX, anchorY]| Anchor point of the icon (relative to its top left corner)
    popupAnchor: [-3, -76], //   popupAnchor: [popupX, popupY] | Popup anchor point of the icon (relative to its top left corner)
  });

  const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);
  // Add a popup to the marker
  marker.bindPopup(`${data.isp}`).openPopup();
}
