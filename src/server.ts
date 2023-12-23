import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const app: Express = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use("*", (req: Request, res: Response) => {
  res.send("Hello from express server");
});

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
