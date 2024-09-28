import { Request, Response } from 'express';

import pool from '../database';

const { genSaltSync, hashSync } = require('bcrypt');

class AreasControllers {

    public async get(req: Request, res: Response) {
        const areas = await pool.query("SELECT a.*, a.nombre as descripcion, a.id as value, concat(u.nombres, ' ', u.apellidos) as nombreLider "
            + "FROM areas a "
            + "inner join usuarios u on u.numeroDocumento = a.lider");
        res.json(areas);
    }

    public async getTotal(req: Request, res: Response) {
        const areas = await pool.query("select count(*) as y, case when estado = 'A' then 'Activo' else 'Inactivo' end as name from areas GROUP by estado");
        res.json(areas);
    }

    public async getTotalUsuariosxArea(req: Request, res: Response) {
        const areas = await pool.query("select count(*) as y, a.nombre as name from areas a inner join usuarios u on u.idArea = a.id group by a.codigo");
        res.json(areas);
    }

    public async getAreaDetails(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const areas = await pool.query("select * from areas where id = ?", [id]);
        if (areas.length > 0) {
            return res.json(areas[0]);
        }
        res.status(404).json({ message: "El area no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query("insert areas set ?", [req.body]);

        res.status(200).json({ message: 'Area guardada correctammente' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query("update areas set ? where id = ?", [req.body, id]);

        res.json({ message: 'Area actualizada correctammente' });
    }

}

const areasControllers = new AreasControllers();
export default areasControllers;