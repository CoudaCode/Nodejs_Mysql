import { Sequelize } from "sequelize";
import { config } from "dotenv";
import path from 'path';
config({
  path: path.join(process.cwd(), ".env.local"),
});
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql"
});

export default sequelize;