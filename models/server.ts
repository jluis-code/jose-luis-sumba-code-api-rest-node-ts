import express, { Application } from 'express';
import mockupRouter from '../routes/mockup.routes';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        mockup: '/api/verification-codes'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Routes definition
        this.routes();
    }

    routes() {
        this.app.use(this.apiPaths.mockup, mockupRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

export default Server;