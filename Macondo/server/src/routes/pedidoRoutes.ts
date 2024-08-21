import { Router } from "express";
import pedidoControllers from "../controllers/pedidoControllers";

class PedidoRoutes{
    public router : Router = Router();
    constructor (){
        this.config();
    }
    config():void{
        this.router.post('/info',pedidoControllers.insertarInfo);
        this.router.post('/crear',pedidoControllers.crearPedido);
        this.router.post('/addprod',pedidoControllers.crearPedidoProd);
        this.router.get('/listar/:idUsuario',pedidoControllers.getPedidos);
        this.router.get('/unpedido/:idPedido',pedidoControllers.getUnPedido);
        this.router.get('/descripcion/:idUsuario/:idPedido',pedidoControllers.getDescripcion);
        this.router.delete('/borrar/:idPedido',pedidoControllers.borrarPedido);
        this.router.delete('/brpedido/:idPedido/:idProducto',pedidoControllers.borrarItemPedido);
        this.router.put('/modificar/:idPedido/:anteriorProdPed',pedidoControllers.modificarPedido);
    }

}

const pedidoRoutes = new PedidoRoutes();
export default pedidoRoutes.router;
