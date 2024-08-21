import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { productoInsertModel } from 'src/app/models/productoInsertModel';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-op-producto',
  templateUrl: './op-producto.component.html',
  styleUrls: ['./op-producto.component.css']
})
export class OpProductoComponent {

  ngOnInit(){
    this.getProductos();
    this.verificarSesion();
  }
  verificarSesion(){
    const session_id=this.cookieService.get('session_id');
    if(session_id!='978bd5877610d24d6f17d259522429c55710f33c6629aea9c95cae39a82ed740541872907ba03d439269dec7d3b1b0ebcfef5831ea0f3f8acbb1daff1577de8d'){
      this.router.navigate(['/inicio']);
    }
  }
  modifProd:productoInsertModel={
    nombre:'',
    descripcion:'',
    precio:0,
    imagen:''
  }
  addData:productoInsertModel={
    nombre:'',
    descripcion:'',
    precio:0,
    imagen:''
  }
  prodData:any=[];
  dataModal:any=[];
  mostrarAlertaUpdate:boolean=false;
  mostrarAlertaDelete:boolean=false;
  hayError:boolean=false;
  getProductos(){
    this.productoService.getProductos().subscribe(
      resp=>{this.prodData=resp},err=>console.log(err)
    )
  }
  getProductoPorIDModal(idProducto:number){
    this.productoService.getUnProducto(idProducto).subscribe(
      resp=>{this.dataModal=resp},err=>console.log(err)
    );
  }
  borrarProducto(idProducto:number){
    this.productoService.eliminarProducto(idProducto).subscribe(
      resp=>{this.mostrarAlertaDelete=true; this.getProductos();},err=>{console.log(err); this.hayError=true;}
    )
  }
  actualizarProducto(idProducto:number){
    const usrDataXD = {
      ...this.modifProd,
      ...this.dataModal[0]
    };
    this.productoService.modificarProducto(idProducto, usrDataXD).subscribe(
      resp=>{this.mostrarAlertaUpdate=true; this.getProductos();},err=>{console.log(err); this.hayError=true;}
    );
  }
  limpiarVariables(){
    this.mostrarAlertaUpdate=false;
    this.hayError=false;
    this.mostrarAlertaDelete=false;
  }
  agregarProducto(){
    this.productoService.insertarProducto(this.addData).subscribe(
      resp=>{this.router.navigate(['/inicio']);},err=>console.log(err)
    );
  }
  constructor(private productoService:ProductoService, private router:Router, private cookieService:CookieService){}
}
