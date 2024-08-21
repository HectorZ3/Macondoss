import { Request, Response } from "express";
import pool from "../database";

class ProductoController {
  public async listarProducto(req: Request, resp: Response) {
    const productoList=await pool.query('SELECT * FROM producto');
    resp.json(productoList);
  }
  public async listarUnProducto(req: Request, resp: Response) {
    const {idProducto}=req.params;
    const productoList=await pool.query('SELECT * FROM producto WHERE idProducto = ?',[idProducto]);
    resp.json(productoList);
  }
  public async insertarProducto(req:Request, resp:Response){
    const producData=req.body;
    await pool.query('INSERT INTO producto SET ?',[producData]);
    resp.json('Producto insertado')
  }
  public async actualizarProducto(req:Request, resp:Response){
    const {idProducto}=req.params;
    const {nombre, descripcion, talla, precio}=req.body;
    await pool.query('UPDATE producto SET nombre = ?, descripcion = ?, precio = ? WHERE idProducto=?',[nombre,descripcion,talla,precio,idProducto]);
    resp.json('Producto actualizado')
  }
  public async borrarProducto(req:Request, resp:Response){
    const {idProducto}=req.params;
    await pool.query('DELETE FROM producto WHERE idProducto = ?',[idProducto]);
    resp.json('Se ha eliminado el producto');
  }
}
const productoController = new ProductoController();
export default productoController;
