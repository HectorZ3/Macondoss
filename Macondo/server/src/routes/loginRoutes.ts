import { Router } from "express";
import loginControllers from "../controllers/loginControllers";

class LoginRoutes{
    public router : Router = Router();
    constructor (){
        this.config();
    }
    config():void{
        //Rutas Login
        this.router.post('/login',loginControllers.userExists);
    }

}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;