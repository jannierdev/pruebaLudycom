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
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
class LoginControllers {
    getLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const numeroDocumento = body.numeroDocumento;
            const results = yield database_1.default.query("select * from usuarios where numeroDocumento = ?", [numeroDocumento]);
            const resul = results[0];
            if (!resul) {
                return res.json({ message: "El usuario no existe" });
            }
            const result = compareSync(body.contrasena, resul.contrasena);
            if (result) {
                resul.contrasena = undefined;
                const jsontoken = sign({ result: resul }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    message: "Inicio exitoso",
                    token: jsontoken,
                    user: resul
                });
            }
            else {
                return res.json({
                    message: "El usuario o password no coinciden"
                });
            }
        });
    }
}
const loginControllers = new LoginControllers();
exports.default = loginControllers;
