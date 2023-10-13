// require("dotenv").config();

const dotenv = require("dotenv");
dotenv.config({ path: `./config.env` });

// const apiRouter = require("./Routes/api");

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
// console.log(process.env.API_KEY);

// Set API key as a local variable to be passed to client-side scripts
app.locals.apiKey = process.env.API_KEY;

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve dynamic script with API key
app.get("/api-key", (req, res) => {
  // Get the API key from locals
  const apiKey = app.locals.apiKey;

  // Send the API key as a JSON response
  res.json({ apiKey });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
