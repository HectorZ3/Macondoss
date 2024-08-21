"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoControllers_1 = __importDefault(require("../controllers/pedidoControllers"));
class PedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/info', pedidoControllers_1.default.insertarInfo);
        this.router.post('/crear', pedidoControllers_1.default.crearPedido);
        this.router.post('/addprod', pedidoControllers_1.default.crearPedidoProd);
        this.router.get('/listar/:idUsuario', pedidoControllers_1.default.getPedidos);
        this.router.get('/unpedido/:idPedido', pedidoControllers_1.default.getUnPedido);
        this.router.get('/descripcion/:idUsuario/:idPedido', pedidoControllers_1.default.getDescripcion);
        this.router.delete('/borrar/:idPedido', pedidoControllers_1.default.borrarPedido);
        this.router.delete('/brpedido/:idPedido/:idProducto', pedidoControllers_1.default.borrarItemPedido);
        this.router.put('/modificar/:idPedido/:anteriorProdPed', pedidoControllers_1.default.modificarPedido);
    }
}
const pedidoRoutes = new PedidoRoutes();
exports.default = pedidoRoutes.router;
