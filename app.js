import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import sequelize from "./config/sequelize.js";
import path from "path";
import userRoute from "./routes/users.js";
import tacheRoute from "./routes/tache.js";
import {serve,setup} from "swagger-ui-express";

import swaggerFile from "./utils/swagger.json" assert { type: "json" };


config({
  path: path.join(process.cwd(), ".env.local"),
});

const PORT = process.env.DB_PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    sequelize
      .authenticate()
      .then(() => {
        console.log("bien connecté a la bd avec sequelize.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
    app.listen(PORT, () => {
      console.log("bien connecté !!!");
    });
  }
});
app.use("/api/users", userRoute);
app.use("/api/taches", tacheRoute);
app.use("/", serve, setup(swaggerFile))
