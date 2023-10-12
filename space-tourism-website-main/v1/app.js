const express = require("express");
const app = express();
const routes = require("./routes/routes");

// const destinationRoutes = require("./routes/destinationRoutes");
// const crewRoutes = require("./routes/crewRoutes");
// const technologyRoutes = require("./routes/technologyRoutes");

// Use the routes defined in routes.js
app.use(routes);

// Middleware to parse JSON body
// app.use(express.json());

// Routes
// app.use("/destinations", destinationRoutes);
// app.use("/crews", crewRoutes);
// app.use("/technologys", technologyRoutes);

// Middleware to serve static files (like HTML, CSS, JS) from a directory
app.use(express.static("public"));

// // API endpoint to get data from data.json
// app.get("/api/data", async (req, res) => {
//   try {
//     const data = await fs.readFile("./data/data.json", "utf8");
//     const jsonData = JSON.parse(data);
//     res.json(jsonData);
//   } catch (error) {
//     console.error("Error reading or parsing data.json:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
