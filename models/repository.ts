import { DataTypes } from "sequelize";
import db from "../db/connection";
import Tribe from "./tribe";

const Repository = db.define(
    "repository",
    {
        id_repository: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_tribe: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
    }
);

Repository.belongsTo(Tribe, { foreignKey: 'id_tribe' });


export default Repository;
