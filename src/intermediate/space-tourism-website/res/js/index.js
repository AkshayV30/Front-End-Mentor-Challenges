import { fetchData } from "./api/fetchData.js";
import { store } from "./store.js";
import { navigate } from "./router.js";
import { renderHeader } from "./components/header.js";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    renderHeader();
    navigate("home");
  } catch (err) {
    console.error(err);
  }
}
