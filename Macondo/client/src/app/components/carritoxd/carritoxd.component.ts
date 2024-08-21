import { Component, OnInit } from '@angular/core';
import { cantidadModel } from 'src/app/models/cantidadModel';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carritoxd',
  templateUrl: './carritoxd.component.html',
  styleUrls: ['./carritoxd.component.css']
})
export class CarritoxdComponent {
  idUsuario:string='';
  total:number=0;
  carritoList:any=[];
  cantidad:cantidadModel={
    cantidad:0
  }
  ngOnInit(){
    this.idUsuario=this.cookieService.get('user_id');
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

  agregarCantidad(num:number,idUsuario:string, idProducto:string){
    this.cantidad.cantidad=this.carritoList[num].cantidad++;
    this.cantidad.cantidad=this.carritoList[num].cantidad;
    this.carritoService.updateCantidad(idUsuario,idProducto,this.cantidad).subscribe(
      resp=>{console.log(resp); this.getCarrito()},err=>console.log(err)
    )
  }

  quitarCantidad(num:number,idUsuario:string, idProducto:string){
    this.cantidad.cantidad=this.carritoList[num].cantidad--;
    this.cantidad.cantidad=this.carritoList[num].cantidad;
    this.carritoService.updateCantidad(idUsuario,idProducto,this.cantidad).subscribe(
      resp=>{console.log(resp); this.getCarrito()},err=>console.log(err)
    )
  }

  borraritemCarrito(idUsuario:string, idProducto:string){
    this.carritoService.borrarItem(idUsuario,idProducto).subscribe(
      resp=>{console.log(resp); this.getCarrito()},err=>console.log(err)
    )
  }

  getCarrito(){
    this.total=0;
    this.carritoService.listarCarrito(this.idUsuario).subscribe(
      resp=>{
        this.carritoList=resp;
        for (let index = 0; index < this.carritoList.length; index++) {
          this.carritoList[index].precio=(this.carritoList[index].cantidad*this.carritoList[index].precio);
          this.total=this.total+this.carritoList[index].precio;
        }
      },err=>console.log(err)
    );
  }
  constructor(private carritoService:CarritoServiceService, private cookieService:CookieService, private router:Router){}
}
