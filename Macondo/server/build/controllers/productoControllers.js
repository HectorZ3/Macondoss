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
class ProductoController {
    listarProducto(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const productoList = yield database_1.default.query('SELECT * FROM producto');
            resp.json(productoList);
        });
    }
    listarUnProducto(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProducto } = req.params;
            const productoList = yield database_1.default.query('SELECT * FROM producto WHERE idProducto = ?', [idProducto]);
            resp.json(productoList);
        });
    }
    insertarProducto(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const producData = req.body;
            yield database_1.default.query('INSERT INTO producto SET ?', [producData]);
            resp.json('Producto insertado');
        });
    }
    actualizarProducto(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProducto } = req.params;
            const { nombre, descripcion, talla, precio } = req.body;
            yield database_1.default.query('UPDATE producto SET nombre = ?, descripcion = ?, precio = ? WHERE idProducto=?', [nombre, descripcion, talla, precio, idProducto]);
            resp.json('Producto actualizado');
        });
    }
    borrarProducto(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProducto } = req.params;
            yield database_1.default.query('DELETE FROM producto WHERE idProducto = ?', [idProducto]);
            resp.json('Se ha eliminado el producto');
        });
    }
}
const productoController = new ProductoController();
exports.default = productoController;
