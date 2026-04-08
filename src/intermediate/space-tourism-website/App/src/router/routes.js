import { renderHome } from "../pages/home.js";
import { renderCrew } from "../pages/crew.js";
import { renderDestination } from "../pages/destination.js";
import { renderTechnology } from "../pages/technology.js";

import data from "@assets/data/data.json";

export const routes = {
  home: {
    render: renderHome,
  },
  crew: {
    render: renderCrew,
    data: {
      inlineData: data.crews,
      key: "crews",
      storeKey: "crews",
    },
  },
  destination: {
    render: renderDestination,
    data: {
      inlineData: data.destinations,
      key: "destinations",
      storeKey: "destinations",
    },
  },
  technology: {
    render: renderTechnology,
    data: {
      inlineData: data.technologies,
      key: "technologies",
      storeKey: "technologies",
    },
  },
};
