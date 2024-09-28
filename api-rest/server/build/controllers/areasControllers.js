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
class AreasControllers {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const areas = yield database_1.default.query("SELECT a.*, a.nombre as descripcion, a.id as value, concat(u.nombres, ' ', u.apellidos) as nombreLider "
                + "FROM areas a "
                + "inner join usuarios u on u.numeroDocumento = a.lider");
            res.json(areas);
        });
    }
    getTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const areas = yield database_1.default.query("select count(*) as y, case when estado = 'A' then 'Activo' else 'Inactivo' end as name from areas GROUP by estado");
            res.json(areas);
        });
    }
    getTotalUsuariosxArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const areas = yield database_1.default.query("select count(*) as y, a.nombre as name from areas a inner join usuarios u on u.idArea = a.id group by a.codigo");
            res.json(areas);
        });
    }
    getAreaDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const areas = yield database_1.default.query("select * from areas where id = ?", [id]);
            if (areas.length > 0) {
                return res.json(areas[0]);
            }
            res.status(404).json({ message: "El area no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("insert areas set ?", [req.body]);
            res.status(200).json({ message: 'Area guardada correctammente' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("update areas set ? where id = ?", [req.body, id]);
            res.json({ message: 'Area actualizada correctammente' });
        });
    }
}
const areasControllers = new AreasControllers();
exports.default = areasControllers;
