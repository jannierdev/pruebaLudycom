import { Request, Response, NextFunction } from 'express';

const { verify } = require('jsonwebtoken');

class TokenValidation {

    public async checkToken(req: Request, res: Response, next: NextFunction) {
        let token = req.get('authorization');

        if (token) {
            token = token.slice(7);
            const validate = verify(token, "qwe1234");

            if (!validate) {
                res.json({
                    success: 0,
                    message: "Token invalido"
                })
            } else {
                next();
            }
        } else {
            res.json({
                success: 0,
                message: "Accesso denegado"
            })
        }
    }
}

const tokenValidation = new TokenValidation();
export default tokenValidation;