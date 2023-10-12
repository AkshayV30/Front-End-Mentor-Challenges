const express = require("express");
const router = express.Router();
const dataController = require("./../controller/dataController");

// Middleware to parse JSON body
router.use(express.json());

// Routes for destination, crew, and technology pages
router.get("/destinations", dataController.getDestinationPage);
router.get("/crews", dataController.getCrewPage);
router.get("/technologys", dataController.getTechnologyPage);

router.get("/", dataController.getHomePage);

// Route to handle the request for data
router.get("/data", dataController.getData);

module.exports = router;
