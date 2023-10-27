import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../config/sequelize.js";

const Tache = sequelize.define("Tache", {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  Title: DataTypes.STRING,
  Description: {
    type: DataTypes.STRING,
    defaultValue: 'PAs de valeur' // This should match the default value you set in PHPMyAdmin
  },
  Time: DataTypes.DATE,
},{
  tableName: 'Taches',
  timestamps: false,
});
export default Tache;