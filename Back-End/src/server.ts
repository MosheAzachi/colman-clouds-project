import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql, { RowDataPacket } from "mysql2";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database as id " + connection.threadId);
});

const s3Client = new S3Client({ region: "eu-central-1" });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/recipes", upload.single("image"), async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(s3Params));
    const imageName = file.originalname;

    const query = "INSERT INTO Recipes (Name, Description, ImageName) VALUES (?, ?, ?)";
    connection.query(query, [name, description, imageName], (err, results) => {
      if (err) {
        console.error("Error inserting into database:", err);
        return res.status(500).json({ message: "Error inserting into database" });
      }

      res.status(201).json({ message: "Recipe created successfully", recipeId: (results as any).insertId });
    });
  } catch (err) {
    console.error("Error uploading to S3:", err);
    return res.status(500).json({ message: "Error uploading to S3" });
  }
});

app.get("/api/recipes", (req: Request, res: Response) => {
  const query = "SELECT * FROM Recipes";
  connection.query(query, async (err, results) => {
    if (err) {
      console.error("Error fetching recipes from database:", err);
      return res.status(500).json({ message: "Error fetching recipes from database" });
    }

    const recipes = await Promise.all(
      (results as RowDataPacket[]).map(async (recipe) => {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: recipe.ImageName,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return {
          ...recipe,
          imageUrl: presignedUrl,
        };
      })
    );

    res.json(recipes);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
