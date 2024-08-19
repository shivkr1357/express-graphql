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

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000", // Specify the frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

const specs = swaggerJSDoc(swaggerOptions) as any;

const upload = multer({ storage, fileFilter });

// Routes
app.use("/api/v1", routes);

// Swagger UI
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// serve static images from uploads folder

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// make a separate upload routes for the images upload

// Endpoint to handle image uploads
app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ error: true, message: "Type is required" });
    }

    const allowedTypes = ["post", "profile"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: true, message: "Invalid type" });
    }

    const image = req.file;
    console.log("image", image);

    if (!image) {
      return res
        .status(400)
        .json({ error: true, message: "No image to uploaded" });
    }

    res.status(200).json({
      error: false,
      message: "Image uploaded successfully",
      filename: `/uploads/${type}/${image.filename}`,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// // Default route
// app.use("*", (req, res) => {
//   res.send("Hello from express server");
// });

// MongoDB connection and Server start

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
