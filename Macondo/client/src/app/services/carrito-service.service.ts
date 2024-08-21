import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { cantidadModel } from '../models/cantidadModel';
import { carritoModel } from '../models/carritoModel';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {
  API_URI= 'http://localhost:3000/api'; //URL Servidor Back-End
  constructor(private http:HttpClient) { }
  listarCarrito(idUsuario:string){
    return this.http.get(`${this.API_URI}/carrito/listar/${idUsuario}`)
  }
  insertarCarrito(carritoData:carritoModel){
    return this.http.post(`${this.API_URI}/carrito/insertar`,carritoData);
  }
  updateCantidad(idUsuario:string,idProducto:string,cantidad:cantidadModel){
    return this.http.put(`${this.API_URI}/carrito/cantidad/${idUsuario}/${idProducto}`,cantidad);
  }
  borrarItem(idUsuario:string,idProducto:string){
    return this.http.delete(`${this.API_URI}/carrito/borrar/${idUsuario}/${idProducto}`);
  }
  vaciarCarrito(idUsuario:string){
    return this.http.delete(`${this.API_URI}/carrito/vaciar/${idUsuario}`);
  }
}
