import { Router } from 'express';

import loginControllers from '../controllers/loginControllers';

class LoginRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/', loginControllers.getLogin);
    }

}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;