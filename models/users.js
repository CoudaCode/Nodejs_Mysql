import { DataTypes } from "sequelize";
import Tache from "./../models/tache.js";
import sequelize from "../config/sequelize.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.TEXT,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },

  {
    tableName: "users",
    timestamps: false,
  }
);
User.hasMany(Tache, { as: "taches", foreignKey: "userId" });
export default User;
