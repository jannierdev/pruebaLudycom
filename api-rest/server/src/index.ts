import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const path = require('path');
import multer from 'multer';
import { v1 as uuidv1 } from 'uuid';

// Import routes
import usersRoutes from './routes/usersRoutes';
import loginRoutes from './routes/loginRoutes';
import areasRoutes from './routes/areasRoutes';

class Server {

    public app: Application

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.port || 3000);

        this.app.use(morgan('dev'));
        this.app.use(cors({ origin: "*" }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(express.static(path.join(__dirname, 'public')));

        var storage = multer.diskStorage({
            destination: path.join(__dirname, 'public/uploads'),
            filename: function (req, file, cb) {
                cb(null, uuidv1() + path.extname(file.originalname));
            }
        })

        this.app.use(multer({ storage: storage }).single('files'));
    }

    routes(): void {
        //Routers Login
        this.app.use('/api/login', loginRoutes);

        //Routers Users
        this.app.use('/api/usuarios', usersRoutes);

        //Routers Areas
        this.app.use('/api/areas', areasRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();