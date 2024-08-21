import { Router } from "express";
import productoController from "../controllers/productoControllers";

class CarritoRoutes{
    public router : Router = Router();
    constructor (){
        this.config();
    }
    config():void{
        this.router.get('/listar/:idProducto', productoController.listarUnProducto);
        this.router.get('/listar', productoController.listarProducto);
        this.router.post('/insertar/',productoController.insertarProducto);
        this.router.put('/modificar/:idProducto',productoController.actualizarProducto);
        this.router.delete('/eliminar/:idProducto', productoController.borrarProducto);
    }

}

const carritoRoutes = new CarritoRoutes();
export default carritoRoutes.router;
