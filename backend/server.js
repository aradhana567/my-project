const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Example POST route (you can use this later)
app.post("/data", (req, res) => {
  const data = req.body;
  console.log("Received:", data);

  res.json({ message: "Data received successfully" });
});

// ✅ IMPORTANT: Render PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Example POST route (you can use this later)
app.post("/data", (req, res) => {
  const data = req.body;
  console.log("Received:", data);

  res.json({ message: "Data received successfully" });
});

// ✅ IMPORTANT: Render PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
