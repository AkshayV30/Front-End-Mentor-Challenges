import { renderHome } from "../pages/home.js";
import { renderCrew } from "../pages/crew.js";
import { renderDestination } from "../pages/destination.js";
import { renderTechnology } from "../pages/technology.js";

export const routes = {
  home: {
    render: renderHome,
  },
  crew: {
    render: renderCrew,
    data: {
      path: "res/data/crews.json",
      key: "crews",
      storeKey: "crews",
    },
  },
  destination: {
    render: renderDestination,
    data: {
      path: "res/data/destinations.json",
      key: "destinations",
      storeKey: "destinations",
    },
  },
  technology: {
    render: renderTechnology,
    data: {
      path: "res/data/technologys.json",
      key: "technologys",
      storeKey: "technologys",
    },
  },
};
