import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pedidoInfo } from '../models/pedidoInfo';
import { idUsuario } from '../models/idUsuario';
import { ProdPedido } from '../models/prodPedido';
import { modifPedido } from '../models/modifPedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  API_URI= 'http://localhost:3000/api'; //Backend
  constructor(private http:HttpClient) { }
  insertarInfo(pedidoInfo:pedidoInfo){
    return this.http.post(`${this.API_URI}/pedido/info/`,pedidoInfo)
  }
  crearPedido(idUsuario:idUsuario){
    return this.http.post(`${this.API_URI}/pedido/crear/`,idUsuario)
  }
  insertarProdPedido(pedidoData:ProdPedido){
    return this.http.post(`${this.API_URI}/pedido/addprod/`,pedidoData)
  }
  getPedidos(idUsuario:string){
    return this.http.get(`${this.API_URI}/pedido/listar/${idUsuario}`);
  }
  getDescripcion(idUsuario:string, idPedido:string){
    return this.http.get(`${this.API_URI}/pedido/descripcion/${idUsuario}/${idPedido}`);
  }
  getUnPedido(idPedido:string){
    return this.http.get(`${this.API_URI}/pedido/unpedido/${idPedido}`);
  }
  borrarPedido(idPedido:string){
    return this.http.delete(`${this.API_URI}/pedido/borrar/${idPedido}`);
  }
  borrarItemModif(idPedido:string,idProducto:number){
    return this.http.delete(`${this.API_URI}/pedido/brpedido/${idPedido}/${idProducto}`);
  }
  modificarPedido(idPedido:string,anteriorProdPed:number, modifPedido:modifPedido){
    return this.http.put(`${this.API_URI}/pedido/modificar/${idPedido}/${anteriorProdPed}`, modifPedido);
  }
}
