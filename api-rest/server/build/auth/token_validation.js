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
Object.defineProperty(exports, "__esModule", { value: true });
const { verify } = require('jsonwebtoken');
class TokenValidation {
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.get('authorization');
            if (token) {
                token = token.slice(7);
                const validate = verify(token, "qwe1234");
                if (!validate) {
                    res.json({
                        success: 0,
                        message: "Token invalido"
                    });
                }
                else {
                    next();
                }
            }
            else {
                res.json({
                    success: 0,
                    message: "Accesso denegado"
                });
            }
        });
    }
}
const tokenValidation = new TokenValidation();
exports.default = tokenValidation;
