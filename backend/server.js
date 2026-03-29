const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ Create table automatically
pool.query(`
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name TEXT,
    roll TEXT,
    thoughts TEXT
  );
`);

// ✅ POST (save data)
app.post("/submit", async (req, res) => {
  try {
    const { name, roll, thoughts } = req.body;

    await pool.query(
      "INSERT INTO students (name, roll, thoughts) VALUES ($1, $2, $3)",
      [name, roll, thoughts]
    );

    console.log("New Data:", name, roll, thoughts);

    res.send("Saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
});

// ✅ GET (fetch data)
app.get("/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

// ✅ Server start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
