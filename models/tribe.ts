import { DataTypes } from "sequelize";
import db from "../db/connection";
import Organization from "./organization";

const Tribe = db.define(
    "tribe",
    {
        id_tribe: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_organization: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        }
    }
);

Tribe.belongsTo(Organization, { foreignKey: 'id_organization' });

export default Tribe;
