import "dotenv/config";
import mysql from "mysql2";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import fs from "fs";

const s3Client = new S3Client({ region: "eu-central-1" });

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

app.get("/api/upload", async (req: Request, res: Response) => {
  const bucketName = "colman-moshe-s3";
  const key = "123.txt"; // Object key in S3
  const filePath = "./123.txt"; // Replace with your local file path

  try {
    const fileBody = fs.readFileSync(filePath);

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileBody,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const msg = `File uploaded successfully to S3 bucket: ${bucketName}`;
    res.json({ msg });
  } catch (error) {
    const msg1 = `Error uploading file to S3: ${error}`;
    res.json({ msg1 });
  }
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
