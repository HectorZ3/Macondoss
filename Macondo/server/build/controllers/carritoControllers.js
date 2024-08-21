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
class CarritoController {
    listarCarrito(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const carritoList = yield database_1.default.query('SELECT C.cantidad,C.idUsuario, C.idProducto, P.nombre, P.precio, P.imagen FROM carrito AS C INNER JOIN producto AS P ON C.idProducto = P.idProducto WHERE C.idUsuario = ?', [idUsuario]);
            resp.json(carritoList);
        });
    }
    insertarCarrito(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO carrito SET ?', [req.body]);
            resp.json('Se insertó el producto al carrito');
        });
    }
    actualizarCantidad(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario, idProducto } = req.params;
            const { cantidad } = req.body;
            yield database_1.default.query('UPDATE carrito SET cantidad = ? WHERE idUsuario=? AND idProducto=?', [cantidad, idUsuario, idProducto]);
            resp.json('Cantidad actualizada');
        });
    }
    borrarItem(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario, idProducto } = req.params;
            yield database_1.default.query('DELETE FROM carrito WHERE idUsuario = ? AND idProducto = ?', [idUsuario, idProducto]);
            resp.json('Se ha eliminado el item');
        });
    }
    vaciarCarrito(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            yield database_1.default.query('DELETE FROM carrito WHERE idUsuario = ?', [idUsuario]);
            resp.json('Se ha eliminado el item');
        });
    }
}
const carritoController = new CarritoController();
exports.default = carritoController;
