import { Request, Response } from 'express';

import pool from '../database';

const { genSaltSync, hashSync } = require('bcrypt');

class UsersControllers {

    public async get(req: Request, res: Response) {
        const users = await pool.query("select u.*, CONCAT(u.nombres, ' ', u.apellidos) as descripcion, numeroDocumento as value, nombre as nombreArea "
            + "from usuarios u "
            + "inner join areas a on a.id = u.idArea");
        res.json(users);
    }

    public async getTotal(req: Request, res: Response) {
        const users = await pool.query("select count(*) as y, case when estado = 'A' then 'Activo' else 'Inactivo' end as name from usuarios GROUP by estado");
        res.json(users);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const salt = genSaltSync(9);
        req.body.contrasena = hashSync(req.body.numeroDocumento, salt);

        const results = await pool.query("select * from usuarios where numeroDocumento = ?", [req.body.numeroDocumento]);
        const resul = results[0];
        if (!resul) {
            await pool.query("insert usuarios set ?", [req.body]);

            res.status(200).json({ message: 'Usuario guardado' })
        } else {
            res.status(200).json({ message: 'Usuario ya existe' })
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        console.log(req.params);

        const { numeroDocumento } = req.params;
        await pool.query("update usuarios set ? where numeroDocumento = ?", [req.body, numeroDocumento]);

        res.json({ message: 'Usuario actualizado' });
    }

}

const usersControllers = new UsersControllers();
export default usersControllers;