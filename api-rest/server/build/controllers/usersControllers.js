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
const { genSaltSync, hashSync } = require('bcrypt');
class UsersControllers {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query("select u.*, CONCAT(u.nombres, ' ', u.apellidos) as descripcion, numeroDocumento as value, nombre as nombreArea "
                + "from usuarios u "
                + "inner join areas a on a.id = u.idArea");
            res.json(users);
        });
    }
    getTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query("select count(*) as y, case when estado = 'A' then 'Activo' else 'Inactivo' end as name from usuarios GROUP by estado");
            res.json(users);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = genSaltSync(9);
            req.body.contrasena = hashSync(req.body.numeroDocumento, salt);
            const results = yield database_1.default.query("select * from usuarios where numeroDocumento = ?", [req.body.numeroDocumento]);
            const resul = results[0];
            if (!resul) {
                yield database_1.default.query("insert usuarios set ?", [req.body]);
                res.status(200).json({ message: 'Usuario guardado' });
            }
            else {
                res.status(200).json({ message: 'Usuario ya existe' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { numeroDocumento } = req.params;
            yield database_1.default.query("update usuarios set ? where numeroDocumento = ?", [req.body, numeroDocumento]);
            res.json({ message: 'Usuario actualizado' });
        });
    }
}
const usersControllers = new UsersControllers();
exports.default = usersControllers;
