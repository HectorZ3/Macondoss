import { Request, Response, query } from "express";
import pool from "../database";

class PedidoControllers {
  public async insertarInfo(req: Request, resp: Response) {
    await pool.query('INSERT INTO userinfo SET ?',[req.body]);
    resp.json('Se ha insertado el pedido.');
  }
  public async crearPedido(req:Request, resp:Response){
    const {idUsuario}=req.body;
    await pool.query('INSERT INTO pedido SET ?',[req.body]);
    const idPedido=await pool.query('SELECT idPedido FROM pedido WHERE idUsuario=? ORDER BY idPedido DESC LIMIT 1',[idUsuario]);
    resp.json(idPedido);
  }
  public async crearPedidoProd(req:Request,resp:Response){
    await pool.query('INSERT INTO pedidoprod SET ?',[req.body]);
    resp.json('Se inserto la ultima tabla woooo');
  }
  public async getPedidos(req:Request,resp:Response){
    const {idUsuario}=req.params;
    const pedidoData=await pool.query('SELECT * FROM pedido WHERE idUsuario=?',[idUsuario]);
    resp.json(pedidoData);
  }
  public async getUnPedido(req:Request,resp:Response){
    const {idPedido}=req.params;
    const pedidoData=await pool.query('SELECT C.cantidad,C.total,C.idPedido, C.idProducto, P.nombre, P.precio, P.imagen FROM pedidoprod AS C INNER JOIN producto AS P ON C.idProducto = P.idProducto WHERE C.idPedido = ?',[idPedido]);
    resp.json(pedidoData);
  }
  public async borrarPedido(req:Request,resp:Response){
    const {idPedido}=req.params;
    await pool.query('DELETE FROM pedidoprod WHERE idPedido = ?',[idPedido]);
    await pool.query('DELETE FROM pedido WHERE idPedido = ?;',[idPedido]);
    resp.json('Pedido borrado');
  }
  public async borrarItemPedido(req:Request, resp:Response){
    const {idPedido, idProducto}=req.params;
    await pool.query('DELETE FROM pedidoprod WHERE idPedido=? AND idProducto=?',[idPedido,idProducto]);
    resp.json('Item borrado de pedido');
  }
  public async getDescripcion(req:Request, resp:Response){
    const {idUsuario, idPedido}=req.params;
    const resultado=await pool.query('SELECT descripcion FROM pedido WHERE idUsuario=? AND idPedido=?',[idUsuario,idPedido]);
    resp.json(resultado);
  }
  public async modificarPedido(req: Request, resp: Response) {
    const { idPedido, anteriorProdPed } = req.params;
    const { idProducto, cantidad, total, descripcion } = req.body;
    setTimeout(async () => {
      await pool.query('UPDATE pedidoprod SET idProducto=?, cantidad=?, total=? WHERE idPedido=? AND idProducto=?;', [idProducto, cantidad, total, idPedido, anteriorProdPed]);
    }, 1000); // 1000 milisegundos = 1 segundo
  
    // Segunda consulta con retraso de 2 segundos
    setTimeout(async () => {
      await pool.query('UPDATE pedido SET descripcion=? WHERE idPedido=?;', [descripcion, idPedido]);
      resp.json('Pedido actualizado');
    }, 2000);
  }

}
const pedidoControllers = new PedidoControllers();
export default pedidoControllers;
