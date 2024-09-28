"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areasControllers_1 = __importDefault(require("../controllers/areasControllers"));
const token_validation_1 = __importDefault(require("../auth/token_validation"));
class AreasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', token_validation_1.default.checkToken, areasControllers_1.default.get);
        this.router.get('/total', token_validation_1.default.checkToken, areasControllers_1.default.getTotal);
        this.router.get('/totalUsuarioArea', token_validation_1.default.checkToken, areasControllers_1.default.getTotalUsuariosxArea);
        this.router.post('/', token_validation_1.default.checkToken, areasControllers_1.default.create);
        this.router.get('/:id', token_validation_1.default.checkToken, areasControllers_1.default.getAreaDetails);
        this.router.put('/:id', token_validation_1.default.checkToken, areasControllers_1.default.update);
    }
}
const areasRoutes = new AreasRoutes();
exports.default = areasRoutes.router;
