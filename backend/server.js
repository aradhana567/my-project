const express = require("express");
const cors = require("cors");

const app = express();

// ✅ IMPORTANT middlewares
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Form submit route
app.post("/submit", (req, res) => {
  const { name, roll, thoughts } = req.body;

  console.log("New Data:");
  console.log("Name:", name);
  console.log("Roll:", roll);
  console.log("Thoughts:", thoughts);

  res.send("Data received successfully 💖");
});

// ✅ Render port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
