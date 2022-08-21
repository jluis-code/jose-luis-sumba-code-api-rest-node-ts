import { DataTypes } from "sequelize";
import db from "../db/connection";
import Organization from "./organization";
import Tribe from "./tribe";
import Repository from './repository';

const Metrics = db.define(
    "metrics",
    {
        id_repository: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        coverage: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        bugs: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vulnerabilities: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hotspot: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code_smells: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
);


Organization.sync().then(() => {
    console.log('sync Organization ok');
}).catch(() => {
    console.log('sync Organization failed');
});



Tribe.sync().then(() => {
    console.log('sync Tribe ok');
}).catch(() => {
    console.log('sync Tribe failed');
});



Metrics.sync().then(() => {
    console.log('sync Metrics ok');
}).catch(() => {
    console.log('sync Metrics failed');
});


//Metrics.belongsTo(Repository, { foreignKey: 'id_repository' });
Repository.hasOne(Metrics, { foreignKey: 'id_repository' });

Repository.sync().then(() => {
    console.log('sync Repository ok');
}).catch(() => {
    console.log('sync Repository failed');
});


export default Metrics;