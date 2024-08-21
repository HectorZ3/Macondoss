import { Router } from "express";
import carritoController from "../controllers/carritoControllers";

class CarritoRoutes{
    public router : Router = Router();
    constructor (){
        this.config();
    }
    config():void{
        this.router.get('/listar/:idUsuario', carritoController.listarCarrito);
        this.router.put('/cantidad/:idUsuario/:idProducto',carritoController.actualizarCantidad);
        this.router.delete('/borrar/:idUsuario/:idProducto',carritoController.borrarItem);
        this.router.delete('/vaciar/:idUsuario',carritoController.vaciarCarrito);
        this.router.post('/insertar/',carritoController.insertarCarrito);
    }

}

const carritoRoutes = new CarritoRoutes();
export default carritoRoutes.router;
