import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import routes from "./routes/index"; // Import the main index file that includes all routes
import { appConfig, swaggerOptions } from "./config/app.config";
import multer from "multer";
import { fileFilter, storage } from "./utils/multer";
import path from "path";
import fs from "fs";

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const specs = swaggerJSDoc(swaggerOptions) as any;

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
app.use("/api/v1", routes);

// Swagger UI
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// make a separate upload routes for the images upload

// Endpoint to handle image uploads
app.post("/api/v1/upload", upload.single("image"), (req, res) => {
   try {
      const { type, postId } = req.body;

      if (!type) {
         return res.status(400).json({ error: "Type and postId are required" });
      }

      const allowedTypes = ["post", "user"];
      if (!allowedTypes.includes(type)) {
         return res.status(400).json({ error: "Invalid type" });
      }

      const image = req.file;

      if (!image) {
         return res.status(400).json({ error: "No image uploaded" });
      }

      const uploadPath = `uploads/${type}`;

      // Check if the directory exists, if not create it
      let date = new Date();

      fs.mkdirSync(uploadPath, { recursive: true });
      const extname = path.extname(image.originalname);

      // Generate new filename with lowercase original name and timestamp
      const filename = `${path
         .basename(image.originalname, extname)
         .toLowerCase()
         .replace(/\s+/g, "")}_${Date.now()}${extname}`;

      console.log("File naame", filename);

      // Move the uploaded file to the appropriate folder
      fs.renameSync(image.path, path.join(uploadPath, filename));

      res.status(200).json({ message: "Image uploaded successfully" });
   } catch (error) {
      console.log("Error", error);
      return res
         .status(500)
         .json({ error: true, message: "Internal server error" });
   }
});

// Default route
app.use("*", (req, res) => {
   res.send("Hello from express server");
});

// Log the discovered routes
// console.log("Discovered routes:", Object.keys(specs?.paths));

// MongoDB connection and Server start

console.log("username", process.env.DB_URL_PROD);

mongoose
   .connect(
      process.env.NODE_ENV === "PROD"
         ? (process.env.DB_URL_PROD as string)
         : appConfig.DB_URL
   )
   .then(() => {
      console.log("MongoDB connected to the database");
      app.listen(port, () => {
         console.log(`App listening on port ${port}`);
      });
   })
   .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
   });
