const fs = require("fs").promises;
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const DATA_FILE_PATH = path.join(__dirname, "..", "data", "data.json");

const dataController = {};

dataController.getData = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading or parsing data.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

dataController.getDestinationPage = (req, res) => {
  const filePath = path.join(PUBLIC_DIR, "html", "destination.html");

  res.sendFile(filePath);
};

dataController.getCrewPage = (req, res) => {
  const filePath = path.join(PUBLIC_DIR, "html", "crews.html");

  res.sendFile(filePath);
};

dataController.getTechnologyPage = (req, res) => {
  const filePath = path.join(PUBLIC_DIR, "html", "technology.html");

  res.sendFile(filePath);
};

dataController.getHomePage = (req, res) => {
  const filePath = path.join(PUBLIC_DIR, "html", "home.html");

  res.sendFile(filePath);
};

module.exports = dataController;
