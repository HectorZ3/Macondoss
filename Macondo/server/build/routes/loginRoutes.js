"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControllers_1 = __importDefault(require("../controllers/loginControllers"));
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Rutas Login
        this.router.post('/login', loginControllers_1.default.userExists);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
