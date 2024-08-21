"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoControllers_1 = __importDefault(require("../controllers/productoControllers"));
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar/:idProducto', productoControllers_1.default.listarUnProducto);
        this.router.get('/listar', productoControllers_1.default.listarProducto);
        this.router.post('/insertar/', productoControllers_1.default.insertarProducto);
        this.router.put('/modificar/:idProducto', productoControllers_1.default.actualizarProducto);
        this.router.delete('/eliminar/:idProducto', productoControllers_1.default.borrarProducto);
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
