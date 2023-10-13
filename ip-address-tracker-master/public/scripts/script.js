"use script";

// DOM Elements
const submitButton = document.querySelector(".search-submit");
const searchInput = document.querySelector(".search-input");
const ipAddressInfo = document.getElementById("ip-address-info");
const locationInfo = document.getElementById("location-info");
const timezoneInfo = document.getElementById("timezone-info");
const ispInfo = document.getElementById("isp-info");
const mapContainer = document.getElementById("map");

let map;

resetMap();

// Event listener for form submission
submitButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
});

// Function to handle search logic
async function handleSearch() {
  const searchTerm = searchInput.value.trim();

  if (isValidInput(searchTerm)) {
    try {
      const data = await fetchData(searchTerm);

      if (!data.isp || !data.location.city || !data.location.region) {
        alert(
          "No Valid ISP or City or Region Could be Found. Please try different IP or Domain"
        );
        resetInfo();
        resetMap();
        return;
      }

      updateInfo(data);
      updateMap(data);
    } catch (error) {
      console.error("Error Fetching data :", error);
      showErrorAlert();
    }
  }
}

// Function to check valid input format
function isValidInput(inputValue) {
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/; // Regular expression for IP addresses
  const domainRegex = /^(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regular expression for domain names
  return ipRegex.test(inputValue) || domainRegex.test(inputValue);
}

// Function to Fetch the API key from the server
async function fecthAPI() {
  try {
    const response = await fetch("/api-key");

    if (!response.ok) throw new Error("Internal Network was not Good");

    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw error;
  }
}

// Function to fetch data from the API
async function fetchData(ipAddressValue) {
  const apiKey = await fecthAPI();
  const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddressValue}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching data:", error);
    throw error;
  }
}

// Function to update information on the page
function updateInfo(data) {
  ipAddressInfo.textContent = `${searchInput.value.trim()}`;
  locationInfo.textContent = `${data.location.city}`;
  timezoneInfo.textContent = `UTC ${data.location.timezone}`;
  ispInfo.textContent = `${data.isp}`;

  console.log("--->", data);
}

function resetInfo() {
  ipAddressInfo.textContent = "-/-/-/-/-";
  locationInfo.textContent = "-/-/-/-/-";
  timezoneInfo.textContent = "-/-/-/-/-";
  ispInfo.textContent = "-/-/-/-/-";
}

function resetMap() {
  // Clear existing map
  if (map) {
    map.off();
    map.remove();
  }
  // Initial Map Configuration
  const coordinates = [0, 0];
  const zoomLevel = 2;

  // Initialize the Leaflet map
  map = L.map(mapContainer).setView(coordinates, zoomLevel);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}

// Function to update the map
function updateMap(data) {
  // Clear existing map
  if (map) {
    map.off();
    map.remove();
  }

  const latitude = data.location.lat;
  const longitude = data.location.lng;
  const coordinates = [latitude, longitude];
  const zoomLevel = 10;

  // Create a new Leaflet map and set the view
  map = L.map(mapContainer).setView(coordinates, zoomLevel);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Define a custom icon using L.Icon class
  const customIcon = L.icon({
    iconUrl: "./img/icon-location.svg",
    iconSize: [20, 36],
    iconAnchor: [12, 75],
    popupAnchor: [-3, -76],
  });

  // Add a marker with a custom icon and popup to the map
  const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);
  marker.bindPopup(`${data.isp}`).openPopup();
}

// Function to show an error alert
function showErrorAlert() {
  alert("An error occurred while fetching data. Please try again later.");
}
