"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path = require('path');
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
// Import routes
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const areasRoutes_1 = __importDefault(require("./routes/areasRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.port || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({ origin: "*" }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(path.join(__dirname, 'public')));
        var storage = multer_1.default.diskStorage({
            destination: path.join(__dirname, 'public/uploads'),
            filename: function (req, file, cb) {
                cb(null, (0, uuid_1.v1)() + path.extname(file.originalname));
            }
        });
        this.app.use((0, multer_1.default)({ storage: storage }).single('files'));
    }
    routes() {
        //Routers Login
        this.app.use('/api/login', loginRoutes_1.default);
        //Routers Users
        this.app.use('/api/usuarios', usersRoutes_1.default);
        //Routers Areas
        this.app.use('/api/areas', areasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
