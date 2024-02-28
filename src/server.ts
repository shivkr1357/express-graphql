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

app.post("/api/v1/upload", upload.single("image"), (req, res) => {
   res.status(200).json({ message: "Image uploaded successfully" });
});

// Default route
app.use("*", (req, res) => {
   res.send("Hello from express server");
});

// Log the discovered routes
console.log("Discovered routes:", Object.keys(specs?.paths));

// MongoDB connection and Server start
mongoose
   .connect(appConfig.DB_URL)
   .then(() => {
      console.log("MongoDB connected to the database");
      app.listen(port, () => {
         console.log(`App listening on port ${port}`);
      });
   })
   .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
   });
