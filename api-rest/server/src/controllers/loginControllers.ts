import { Request, Response } from 'express';

import pool from '../database';

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

class LoginControllers {

    public async getLogin(req: Request, res: Response): Promise<any> {
        const body = req.body;

        const numeroDocumento = body.numeroDocumento;
        const results = await pool.query("select * from usuarios where numeroDocumento = ?", [numeroDocumento]);
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
        } else {
            return res.json({
                message: "El usuario o password no coinciden"
            });
        }

    }
}

const loginControllers = new LoginControllers();
export default loginControllers;