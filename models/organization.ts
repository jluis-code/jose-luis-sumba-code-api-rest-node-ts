import { DataTypes } from "sequelize";
import db from "../db/connection";

const Organization = db.define(
    "organization",
    {
        id_organization: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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

Organization.sync().then(() => {
    console.log('sync Organization ok');
}).catch(() => {
    console.log('sync Organization failed');
});

export default Organization;
