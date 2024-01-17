import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import routes from "./routes/index"; // Import the main index file that includes all routes
import { appConfig } from "./config/app.config";

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Swagger Options
const swaggerOptions = {
   definition: {
      openapi: "3.1.0",
      info: {
         title: "New APIs for social media",
         version: "0.1.0",
         description:
            "This is the backend API of the SocialMedia application, documented using Swagger",
         license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
         },
         contact: {
            name: "ItsIndianGuy",
            url: "https://itsindianguy.in",
            email: "shivshankarkumar.pusa@gail.com",
         },
      },
      servers: [
         {
            url: "http://localhost:4000/api/v1",
         },
      ],
   },
   apis: ["./routes/index.ts"], // Specify the main index file that includes all routes
};

const specs = swaggerJSDoc(swaggerOptions) as any;

// Log the discovered routes
console.log("Discovered routes:", Object.keys(specs?.paths));

// Routes
app.use("/api/v1", routes);

// Swagger UI
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Default route
app.use("*", (req, res) => {
   res.send("Hello from express server");
});

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
