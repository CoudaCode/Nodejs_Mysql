import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import path from "path";
import { serve, setup } from "swagger-ui-express";
import { connectDB } from "./config/db.js";
import sequelize from "./config/sequelize.js";
import tacheRoute from "./routes/tache.js";
import userRoute from "./routes/users.js";
import swaggerFile from "./utils/swagger.json" assert { type: "json" };

config({
  path: path.join(process.cwd(), ".env.local"),
});

const PORT = process.env.DB_PORT;
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // autoriser les cookies
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
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
app.use("/", serve, setup(swaggerFile));
