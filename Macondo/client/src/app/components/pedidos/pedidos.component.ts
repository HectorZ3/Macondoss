import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { CookieService } from 'ngx-cookie-service';
import { modifPedido } from 'src/app/models/modifPedido';
import { ProductoService } from 'src/app/services/producto.service';
import { cantidadModel } from 'src/app/models/cantidadModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  mdfPedido:modifPedido={
    idProducto:0,
    cantidad:0,
    total:0,
    descripcion:''
  }
  cantidad:cantidadModel={
    cantidad:0
  }
  idPedidox='';
  pedidoData:any=[];
  pedidoData2:any=[];
  productos:any=[];
  pedidoModal:any=[];
  precioProd:any=[];
  anteriorProdPed:any=[];
  descripcionPed:any=[];
  total=0;
  modifPedido:boolean=false;
  ngOnInit(){
    this.getPedidos();
    this.verificarSesion();
  }

  verificarSesion(){
    const session_id=this.cookieService.get('session_id');
    if(session_id!='978bd5877610d24d6f17d259522429c55710f33c6629aea9c95cae39a82ed740541872907ba03d439269dec7d3b1b0ebcfef5831ea0f3f8acbb1daff1577de8d'){
      if(session_id!='e4b7b5b1162da37abeff1df9ad7590fdf2197ac7a00acfec38d78c666a4df1f60663675ee40df49dff7ae5f93993d72b75a4de998e6f0af063d6348a2c97a74c'){
        this.router.navigate(['/inicio']);
      }
    }
  }

  getPedidos(){
    const userID=this.cookieService.get('user_id');
    this.pedidoService.getPedidos(userID).subscribe(
      resp=>{this.pedidoData=resp;},err=>console.log(err)
    )
  }

  getUnPedido(idPedido:string){
    this.modifPedido=false;
    this.idPedidox=idPedido;
    const idUser=this.cookieService.get('user_id');
    this.pedidoService.getUnPedido(idPedido).subscribe(
      resp=>{this.pedidoData2=resp; this.total=this.pedidoData2[0].total; this.pedidoModal=resp;
        for (let index = 0; index < this.pedidoModal.length; index++) {
          this.anteriorProdPed[index]=this.pedidoData2[index].idProducto;
          this.calcularPrecio(index, this.pedidoModal[index].idProducto, this.pedidoModal[index].cantidad);
          this.getDescripcion(idUser,idPedido);
        };
      },err=>console.log(err)
    )
  }

  borrarPedido(idPedido:string){
    this.pedidoService.borrarPedido(idPedido).subscribe(
      resp=>{console.log(resp); window.location.reload();},err=>console.log(err)
    );
  }
  modificarPedido(idPedido:string){
    this.modifPedido=true;
    this.getProductos();
  }
  agregarCantidad(num:number,idPedido:string, idProducto:number){
    this.cantidad.cantidad=this.pedidoModal[num].cantidad++;
    this.cantidad.cantidad=this.pedidoModal[num].cantidad;
    this.calcularPrecio(num, idProducto,this.pedidoModal[num].cantidad);
  }

  quitarCantidad(num:number,idPedido:string, idProducto:number){
    this.cantidad.cantidad=this.pedidoModal[num].cantidad--;
    this.cantidad.cantidad=this.pedidoModal[num].cantidad;
    this.calcularPrecio(num, idProducto,this.pedidoModal[num].cantidad);
  }
  borraritemCarrito(idPedido:string, idProducto:number){
    this.pedidoService.borrarItemModif(idPedido,idProducto).subscribe(
      resp=>{console.log(resp); this.getUnPedido(idPedido); this.modificarPedido(idPedido);},err=>console.log(err)
    )
  }

  calcularPrecio(num:number,idProducto:number,cantidad:number){
    this.productoService.getUnProducto(idProducto).subscribe(
      resp=>{this.precioProd=resp; this.precioProd[0].precio=(this.precioProd[0].precio*cantidad); this.pedidoModal[num].total=this.precioProd[0].precio; this.pedidoModal[num].total=this.pedidoModal[num].total;}
    )
  }

  getDescripcion(idUsuario:string,idPedido:string){
    this.pedidoService.getDescripcion(idUsuario,idPedido).subscribe(
      resp=>{this.descripcionPed=resp; this.pedidoModal[0].descripcion=this.descripcionPed[0].descripcion;},err=>console.log(err)
    )
  }

  actualizarPrecios(idPedido:string){
    for (let index = 0; index < this.pedidoModal.length; index++) {
      this.calcularPrecio(index, this.pedidoModal[index].idProducto, this.pedidoModal[index].cantidad);
    }
    setTimeout(() => {
      this.guardarCambios(idPedido)
    }, 1*1000);
  }

  guardarCambios(idPedido:string){
    let totalxd=0;
    for (let index = 0; index < this.pedidoModal.length; index++) {
      totalxd=totalxd+this.pedidoModal[index].total;
    }
    this.pedidoModal[0].total=totalxd;
    for (let index = 0; index < this.pedidoModal.length; index++) {
      this.mdfPedido.idProducto=this.pedidoModal[index].idProducto;
      this.mdfPedido.cantidad=this.pedidoModal[index].cantidad;
      this.mdfPedido.total=this.pedidoModal[0].total;
      this.mdfPedido.descripcion=this.pedidoModal[0].descripcion;
      this.pedidoService.modificarPedido(idPedido,this.anteriorProdPed[index],this.mdfPedido).subscribe(
        resp=>{console.log(resp); window.location.reload();},err=>console.log(err)
      );
    }
  }


  getProductos(){
    this.productoService.getProductos().subscribe(
      resp=>{this.productos=resp;},err=>console.log(err)
    )
  }
  constructor(private pedidoService:PedidoService, private router:Router, private cookieService:CookieService, private productoService:ProductoService){}
}
