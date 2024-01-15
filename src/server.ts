import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { appConfig } from "./config/app.config";

const app: Express = express();

dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use("*", (req: Request, res: Response) => {
  res.send("Hello from express server");
});

mongoose.connect(appConfig.DB_URL).then(() => {
  console.log("Mongo db connected to the database");
  app.listen(port, () => {
    console.log(`App listening to port ${port}`);
  });
});
