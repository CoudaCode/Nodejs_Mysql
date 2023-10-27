import { createConnection } from "mysql";
import { config } from "dotenv";
import path from 'path';
config({
  path: path.join(process.cwd(), ".env.local"),
});
export const connectDB = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
