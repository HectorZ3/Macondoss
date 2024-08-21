import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { productoInsertModel } from '../models/productoInsertModel';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI= 'http://localhost:3000/api'; //URL Servidor Back-End
  constructor(private http:HttpClient) { }

  getProductos(){
    return this.http.get(`${this.API_URI}/productos/listar/`);
  }
  getUnProducto(idProducto:number){
    return this.http.get(`${this.API_URI}/productos/listar/${idProducto}`);
  }
  insertarProducto(productData:productoInsertModel){
    return this.http.post(`${this.API_URI}/productos/insertar/`,productData);
  }
  modificarProducto(idProducto:number, productData:productoInsertModel){
    return this.http.put(`${this.API_URI}/productos/modificar/${idProducto}`, productData);
  }
  eliminarProducto(idProducto:number){
    return this.http.delete(`${this.API_URI}/productos/eliminar/${idProducto}`);
  }
}
