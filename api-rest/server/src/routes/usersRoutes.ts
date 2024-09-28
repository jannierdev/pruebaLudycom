import { Router } from 'express';

import usersControllers from '../controllers/usersControllers';
import tokenValidation from '../auth/token_validation';

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', tokenValidation.checkToken, usersControllers.get);
        this.router.get('/total', tokenValidation.checkToken, usersControllers.getTotal);
        this.router.post('/', tokenValidation.checkToken, usersControllers.create);
        this.router.put('/:numeroDocumento', tokenValidation.checkToken, usersControllers.update);
    }

}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;