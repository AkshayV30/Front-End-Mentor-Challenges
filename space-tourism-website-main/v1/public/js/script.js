document.addEventListener("DOMContentLoaded", async () => {
  const destinationLink = document.getElementById("destination-link");
  const crewLink = document.getElementById("crew-link");
  const technologyLink = document.getElementById("technology-link");

  destinationLink.addEventListener("click", async (event) => {
    event.preventDefault();
    await fetchData("/destinations", "destinations");
  });

  crewLink.addEventListener("click", async (event) => {
    event.preventDefault();
    isLinkClicked = true;
    await fetchData("/crew", "crew");
  });

  technologyLink.addEventListener("click", async (event) => {
    event.preventDefault();
    await fetchData("/technologys", "technology");
  });
});

async function fetchData(endpoint, containerId) {
  const url = `http://localhost:3000${endpoint}`;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    // console.log("Fetching data from:", url);
    // console.log(response, jsonData);

    updateDOM(containerId, jsonData);
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

function updateDOM(containerId, items) {
  const container = document.getElementById(containerId);

  console.log("line 37:", container);

  container.innerHTML = ""; // Clear the container before adding new elements
  items.forEach((item) => {
    const itemElement = createHTMLElement(
      "div",
      templateFunctions[containerId](item)
    );
    container.appendChild(itemElement);
  });
}

const templateFunctions = {
  destinations: (destination) => `
    <h2>${destination.name}</h2>
    <img src="${destination.images.png}" alt="${destination.name}">
    <p>${destination.description}</p>
    <p>Distance: ${destination.distance}</p>
    <p>Travel Time: ${destination.travel}</p>
  `,
  crew: (crewMember) =>
    `
    <h2>${crewMember.name}</h2>
    <img src="${crewMember.images.png}" alt="${crewMember.name}">
    <p>Role: ${crewMember.role}</p>
    <p>Bio: ${crewMember.bio}</p>
  `,
  technology: (tech) => `
    <h2>${tech.name}</h2>
    <img src="${tech.images.portrait}" alt="${tech.name}">
    <p>${tech.description}</p>
  `,
};

function createHTMLElement(tag, html) {
  const element = document.createElement(tag);
  element.innerHTML = html;
  return element;
}
