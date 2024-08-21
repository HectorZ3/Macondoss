"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoControllers_1 = __importDefault(require("../controllers/carritoControllers"));
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/:idUsuario', carritoControllers_1.default.listarCarrito);
        this.router.put('/cantidad/:idUsuario/:idProducto', carritoControllers_1.default.actualizarCantidad);
        this.router.delete('/borrar/:idUsuario/:idProducto', carritoControllers_1.default.borrarItem);
        this.router.delete('/vaciar/:idUsuario', carritoControllers_1.default.vaciarCarrito);
        this.router.post('/insertar/', carritoControllers_1.default.insertarCarrito);
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
