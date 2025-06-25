import express from "express";
import { config } from "./config/";
import { router } from "./routes";
import { db } from "./config/db.config";
import dotenv from "dotenv";

const app = express();
db.connect();
dotenv.config();

app.use(express.json()) //parse the body to an object
app.use("/", router);

app.listen(config.port, () => {
  console.log(`App Running on port ${config.port}`);
});
