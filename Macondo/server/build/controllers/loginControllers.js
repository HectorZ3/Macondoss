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
class LoginControllers {
    userExists(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let idTipoUsuario = 0;
            let claveUsuario = '';
            const { idUsuario, passwd } = req.body;
            try {
                const queryResult = yield database_1.default.query('SELECT idUsuario,idTipoUsuario FROM usuarios WHERE idUsuario = ? AND passwd = ?', [idUsuario, passwd]);
                if (queryResult.length > 0) {
                    claveUsuario = queryResult[0].cveUsuario;
                    idTipoUsuario = queryResult[0].idTipoUsuario;
                    resp.json({ usuarioExiste: true, idTipoUsuario, idUsuario });
                }
                else {
                    resp.json({ usuarioExiste: false, idTipoUsuario });
                }
            }
            catch (error) {
                resp.json({ usuarioExiste: false, idTipoUsuario });
            }
        });
    }
}
const loginControllers = new LoginControllers();
exports.default = loginControllers;
