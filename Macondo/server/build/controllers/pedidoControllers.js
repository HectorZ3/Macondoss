"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PedidoControllers {
    insertarInfo(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO userinfo SET ?', [req.body]);
            resp.json('Se ha insertado el pedido.');
        });
    }
    crearPedido(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.body;
            yield database_1.default.query('INSERT INTO pedido SET ?', [req.body]);
            const idPedido = yield database_1.default.query('SELECT idPedido FROM pedido WHERE idUsuario=? ORDER BY idPedido DESC LIMIT 1', [idUsuario]);
            resp.json(idPedido);
        });
    }
    crearPedidoProd(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO pedidoprod SET ?', [req.body]);
            resp.json('Se inserto la ultima tabla woooo');
        });
    }
    getPedidos(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const pedidoData = yield database_1.default.query('SELECT * FROM pedido WHERE idUsuario=?', [idUsuario]);
            resp.json(pedidoData);
        });
    }
    getUnPedido(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido } = req.params;
            const pedidoData = yield database_1.default.query('SELECT C.cantidad,C.total,C.idPedido, C.idProducto, P.nombre, P.precio, P.imagen FROM pedidoprod AS C INNER JOIN producto AS P ON C.idProducto = P.idProducto WHERE C.idPedido = ?', [idPedido]);
            resp.json(pedidoData);
        });
    }
    borrarPedido(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido } = req.params;
            yield database_1.default.query('DELETE FROM pedidoprod WHERE idPedido = ?', [idPedido]);
            yield database_1.default.query('DELETE FROM pedido WHERE idPedido = ?;', [idPedido]);
            resp.json('Pedido borrado');
        });
    }
    borrarItemPedido(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido, idProducto } = req.params;
            yield database_1.default.query('DELETE FROM pedidoprod WHERE idPedido=? AND idProducto=?', [idPedido, idProducto]);
            resp.json('Item borrado de pedido');
        });
    }
    getDescripcion(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario, idPedido } = req.params;
            const resultado = yield database_1.default.query('SELECT descripcion FROM pedido WHERE idUsuario=? AND idPedido=?', [idUsuario, idPedido]);
            resp.json(resultado);
        });
    }
    modificarPedido(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido, anteriorProdPed } = req.params;
            const { idProducto, cantidad, total, descripcion } = req.body;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield database_1.default.query('UPDATE pedidoprod SET idProducto=?, cantidad=?, total=? WHERE idPedido=? AND idProducto=?;', [idProducto, cantidad, total, idPedido, anteriorProdPed]);
            }), 1000); // 1000 milisegundos = 1 segundo
            // Segunda consulta con retraso de 2 segundos
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield database_1.default.query('UPDATE pedido SET descripcion=? WHERE idPedido=?;', [descripcion, idPedido]);
                resp.json('Pedido actualizado');
            }), 2000);
        });
    }
}
const pedidoControllers = new PedidoControllers();
exports.default = pedidoControllers;
