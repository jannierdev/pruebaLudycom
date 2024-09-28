import { Router } from 'express';

import areasControllers from '../controllers/areasControllers';
import tokenValidation from '../auth/token_validation';

class AreasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', tokenValidation.checkToken, areasControllers.get);
        this.router.get('/total', tokenValidation.checkToken, areasControllers.getTotal);
        this.router.get('/totalUsuarioArea', tokenValidation.checkToken, areasControllers.getTotalUsuariosxArea);
        this.router.post('/', tokenValidation.checkToken, areasControllers.create);
        this.router.get('/:id', tokenValidation.checkToken, areasControllers.getAreaDetails);
        this.router.put('/:id', tokenValidation.checkToken, areasControllers.update);
    }

}

const areasRoutes = new AreasRoutes();
export default areasRoutes.router;