import { fetchData } from "./api/fetchData.js";
import { store } from "./store.js";
import { navigate } from "./router.js";
import { renderHeader } from "./components/header.js";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const [crew, destination, technology] = await Promise.all([
      fetchData("res/data/crews.json", "crews"),
      fetchData("res/data/destinations.json", "destinations"),
      fetchData("res/data/technologys.json", "technologys"),
    ]);

    store.data = { crew, destination, technology };

    renderHeader();
    navigate("home");

    // document.body.classList.remove("preload");
  } catch (err) {
    console.error(err);
  }
}
