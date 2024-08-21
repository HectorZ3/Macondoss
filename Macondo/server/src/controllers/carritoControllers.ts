import { Request, Response } from "express";
import pool from "../database";

class CarritoController {
  public async listarCarrito(req: Request, resp: Response) {
    const {idUsuario}=req.params;
    const carritoList=await pool.query('SELECT C.cantidad,C.idUsuario, C.idProducto, P.nombre, P.precio, P.imagen FROM carrito AS C INNER JOIN producto AS P ON C.idProducto = P.idProducto WHERE C.idUsuario = ?',[idUsuario]);
    resp.json(carritoList);
  }
  public async insertarCarrito(req:Request, resp:Response){
    await pool.query('INSERT INTO carrito SET ?', [req.body]);
    resp.json('Se insertó el producto al carrito')
  }
  public async actualizarCantidad(req:Request, resp:Response){
    const {idUsuario, idProducto}=req.params;
    const {cantidad}=req.body;
    await pool.query('UPDATE carrito SET cantidad = ? WHERE idUsuario=? AND idProducto=?',[cantidad,idUsuario,idProducto]);
    resp.json('Cantidad actualizada')
  }
  public async borrarItem(req:Request, resp:Response){
    const {idUsuario, idProducto}=req.params;
    await pool.query('DELETE FROM carrito WHERE idUsuario = ? AND idProducto = ?',[idUsuario,idProducto]);
    resp.json('Se ha eliminado el item');
  }
  public async vaciarCarrito(req:Request, resp:Response){
    const {idUsuario}=req.params;
    await pool.query('DELETE FROM carrito WHERE idUsuario = ?',[idUsuario]);
    resp.json('Se ha eliminado el item');
  }
}
const carritoController = new CarritoController();
export default carritoController;
