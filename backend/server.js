const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name TEXT,
    roll TEXT,
    thoughts TEXT
  );
`);

// API to save data
app.post("/submit", async (req, res) => {
  const { name, roll, thoughts } = req.body;

  try {
    await pool.query(
      "INSERT INTO students (name, roll, thoughts) VALUES ($1, $2, $3)",
      [name, roll, thoughts]
    );

    res.send("Data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
