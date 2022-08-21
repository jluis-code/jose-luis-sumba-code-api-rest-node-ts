import express, { Application } from 'express';
import mockupRouter from '../routes/mockup.routes';
import organizationRouter from '../routes/organization.routes';
import metricRouter from '../routes/metrics.routes';
import cors from 'cors';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        mockup: '/api/verification-codes',
        organization: '/api/organization',
        metric: '/api/metrics'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //1. Connect to database
        this.dbConnection();

        //2 DefineMiddlewares
        this.middlewares();

        //3 Define routes
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Body read
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.mockup, mockupRouter);
        this.app.use(this.apiPaths.organization, organizationRouter);
        this.app.use(this.apiPaths.metric, metricRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }

    async dbConnection() {
        console.log('dbConnection');
        try {
            await db.authenticate();
            console.log('dbonline');
        } catch (error) {
            console.log('dbConnection Error');
            throw new Error(`${error}`);
        }
    }
}

export default Server;