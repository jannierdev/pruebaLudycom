"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = __importDefault(require("../controllers/usersControllers"));
const token_validation_1 = __importDefault(require("../auth/token_validation"));
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', token_validation_1.default.checkToken, usersControllers_1.default.get);
        this.router.get('/total', token_validation_1.default.checkToken, usersControllers_1.default.getTotal);
        this.router.post('/', token_validation_1.default.checkToken, usersControllers_1.default.create);
        this.router.put('/:numeroDocumento', token_validation_1.default.checkToken, usersControllers_1.default.update);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
