import { Component, OnInit } from '@angular/core';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { CookieService } from 'ngx-cookie-service';
import { pedidoInfo } from 'src/app/models/pedidoInfo';
import { PedidoService } from 'src/app/services/pedido.service';
import { idUsuario } from 'src/app/models/idUsuario';
import { ProdPedido } from 'src/app/models/prodPedido';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-formulario-informacion',
  templateUrl: './formulario-informacion.component.html',
  styleUrls: ['./formulario-informacion.component.css']
})
export class FormularioInformacionComponent {
  Usuario:string='';
  usuarioID:idUsuario={
    idUsuario:'',
    idPedido:'',
    descripcion:''
  }
  total:number=0;
  prodCarrito:any=[];
  respPedido:any=[];
  prodPedido:ProdPedido={
    idPedido:'',
    idProducto:0,
    cantidad:0,
    total:0
  }
  pedidoInfo:pedidoInfo={
    nombre:'',
    apePat:'',
    apeMat:'',
    email:'',
    referencia:'',
    telefono:0,
    idUsuario:''
  }
  ngOnInit(){
    this.Usuario=this.cookieService.get('user_id');
    this.getCarrito();
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

  insertarInfo(){
    this.pedidoInfo.idUsuario=this.cookieService.get('user_id');
    this.pedidoService.insertarInfo(this.pedidoInfo).subscribe(
      resp=>{
        console.log(resp)
      },err=>console.log(err)
    );
  }
  generarNuevoIdPedido(): string {
    return uuidv4();
  }

  insertarPedido(){
    this.usuarioID.idUsuario=this.cookieService.get('user_id');
    const idPed=this.generarNuevoIdPedido();
    this.usuarioID.idPedido=idPed;
    this.pedidoService.crearPedido(this.usuarioID).subscribe(
      resp=>{
        this.respPedido=resp;
        this.prodPedido.idPedido=idPed;
          for (let index = 0; index < this.prodCarrito.length; index++) {
            this.prodPedido.idProducto=this.prodCarrito[index].idProducto;
            this.prodPedido.cantidad=this.prodCarrito[index].cantidad;
            this.prodPedido.total=this.total;
            this.pedidoService.insertarProdPedido(this.prodPedido).subscribe(
              resp=>{console.log(resp)},err=>console.log(err)
            );
          }; this.vaciarCarrito(); this.router.navigate(['/pedidos']);
      },err=>console.log(err)
    )
  }

  vaciarCarrito(){
    const idUsuario=this.cookieService.get('user_id');
    this.carritoService.vaciarCarrito(idUsuario).subscribe(
      resp=>{console.log(resp)},err=>console.log(err)
    );
  }

  getCarrito(){
    this.total=0;
    this.carritoService.listarCarrito(this.Usuario).subscribe(
      resp=>{
        this.prodCarrito=resp;
        for (let index = 0; index < this.prodCarrito.length; index++) {
          this.prodCarrito[index].precio=(this.prodCarrito[index].cantidad*this.prodCarrito[index].precio);
          this.total=this.total+this.prodCarrito[index].precio;
        }
      },err=>console.log(err)
    );
  }
  
  constructor(private router:Router,private carritoService:CarritoServiceService, private cookieService:CookieService, private pedidoService:PedidoService){}
}
