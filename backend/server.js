const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔗 Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ Create table automatically
pool.query(`
  CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    name TEXT,
    roll TEXT,
    thoughts TEXT
  )
`);

// ✅ Save data to DB
app.post("/submit", async (req, res) => {
  const { name, roll, thoughts } = req.body;

  try {
    await pool.query(
      "INSERT INTO submissions (name, roll, thoughts) VALUES ($1, $2, $3)",
      [name, roll, thoughts]
    );

    res.json({ message: "Saved in database 💖" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ message: "Error saving data" });
  }
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
