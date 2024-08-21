import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { LoginService } from 'src/app/services/login.service';
import { LoginModel } from 'src/app/models/loginModel';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CarritoServiceService } from 'src/app/services/carrito-service.service';
import { carritoModel } from 'src/app/models/carritoModel';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  productos:any=[];
  loginData:LoginModel={
    idUsuario:'',
    passwd:''
  }
  carritoData:carritoModel={
    idUsuario:'',
    idProducto:0,
    cantidad:1
  }
  usuario: string='';
  contra: string='';
  mensaje: string='';
  usuarioExiste:boolean=false;
  idTipoUsuario:number=0;
  respData:any={}
  mostrarAlerta:boolean=false;

  ngOnInit(){
    this.getProductos();
    this.verificarCookie();
  }
  login() {
    this.loginService.login(this.loginData).subscribe(
      resp=>{this.respData=resp; this.crearSesionCookie(); this.verificarCookie(); window.location.reload();},err=>console.log(err)
    )
  }
  crearSesionCookie(){
    const typeUser=this.respData.idTipoUsuario;
    switch (typeUser){
      case 1:
        this.cookieService.set('session_id', '978bd5877610d24d6f17d259522429c55710f33c6629aea9c95cae39a82ed740541872907ba03d439269dec7d3b1b0ebcfef5831ea0f3f8acbb1daff1577de8d',7);
        this.cookieService.set('user_id',this.respData.idUsuario,7);
        break;
      case 2:
        this.cookieService.set('session_id','e4b7b5b1162da37abeff1df9ad7590fdf2197ac7a00acfec38d78c666a4df1f60663675ee40df49dff7ae5f93993d72b75a4de998e6f0af063d6348a2c97a74c',7);
        this.cookieService.set('user_id',this.respData.idUsuario,7);
        break;
      default:
        this.cookieService.set('session_id','e642d18c9ac8d605574e902d39f302a733ac35742f219a9127ce16df1a6e7af76e160690a001ee6f70cb53aa25f7cfdfda49cbaa51b2c7bba0a2bbefc7717601');
        this.cookieService.set('user_id','0');
      }
  }

  verificarCookie(){
    const cookieExist=this.cookieService.check('session_id');
    const hashCookie=this.cookieService.get('session_id');
    if(!cookieExist){
      this.cookieService.set('session_id','e642d18c9ac8d605574e902d39f302a733ac35742f219a9127ce16df1a6e7af76e160690a001ee6f70cb53aa25f7cfdfda49cbaa51b2c7bba0a2bbefc7717601');
    }else{
      if(hashCookie=='978bd5877610d24d6f17d259522429c55710f33c6629aea9c95cae39a82ed740541872907ba03d439269dec7d3b1b0ebcfef5831ea0f3f8acbb1daff1577de8d'){
        this.usuarioExiste=true;
        this.idTipoUsuario=1;
      }else{
        if(hashCookie=='e4b7b5b1162da37abeff1df9ad7590fdf2197ac7a00acfec38d78c666a4df1f60663675ee40df49dff7ae5f93993d72b75a4de998e6f0af063d6348a2c97a74c'){
          this.usuarioExiste=true;
          this.idTipoUsuario=2;
        }else{
          if(hashCookie=='e642d18c9ac8d605574e902d39f302a733ac35742f219a9127ce16df1a6e7af76e160690a001ee6f70cb53aa25f7cfdfda49cbaa51b2c7bba0a2bbefc7717601'){
            this.usuarioExiste=false;
            this.idTipoUsuario=0;
          }
        }
      }
    }
  }
  getProductos(){
    this.productoService.getProductos().subscribe(
      resp=>{this.productos=resp;},err=>console.log(err)
    );
  }
  insertarCarrito(idProducto:number){
    const idUsuario=this.cookieService.get('user_id');
    this.carritoData.idUsuario=idUsuario;
    this.carritoData.idProducto=idProducto;
    this.carritoService.insertarCarrito(this.carritoData).subscribe(
      resp=>{this.router.navigate(['/carrito']);},err=>console.log(err)
    );
  }
  constructor(private productoService:ProductoService, private loginService:LoginService, private cookieService:CookieService, private router:Router, private carritoService:CarritoServiceService){}
}
