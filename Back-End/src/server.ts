import "dotenv/config";
import mysql from "mysql2";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // AWS RDS endpoint
  user: process.env.DB_USER, // MySQL database username
  password: process.env.DB_PASSWORD, // MySQL database password
  database: process.env.DB_NAME, // MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:");
    console.error(err); // Log the full error object for debugging
    return;
  }
  console.log("Connected to MySQL database as id " + connection.threadId);
});

// Routes
app.get("/api/code", (req: Request, res: Response) => {
  const code = "Hi from the back!";
  res.json({ code });
});

app.get("/api/rds", (req: Request, res: Response) => {
  connection.query("SELECT * FROM Words WHERE ID = 1", (err, result, fields) => {
    if (err) {
      console.error("Error fetching data from Words table:");
      console.error(err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json({ result });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
