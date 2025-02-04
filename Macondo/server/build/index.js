"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const carritoRoutes_1 = __importDefault(require("./routes/carritoRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const pedidoRoutes_1 = __importDefault(require("./routes/pedidoRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        //this.app.use('/', indexRoutes);
        this.app.use('/api/carrito', carritoRoutes_1.default);
        this.app.use('/api/productos', productoRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
        this.app.use('/api/pedido', pedidoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => (console.log('Servidor en el puerto ', this.app.get('port'))));
    }
}
const server = new Server();
server.start();
