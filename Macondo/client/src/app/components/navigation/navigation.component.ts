import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  usuarioExiste:boolean=false;
  idTipoUsuario:number=0;
  ngOnInit(){
    this.verificarCookie();
  }

  verificarCookie(){
    const hashCookie=this.cookieService.get('session_id');
    const user_id=this.cookieService.get('user_id');
    if(hashCookie=='e642d18c9ac8d605574e902d39f302a733ac35742f219a9127ce16df1a6e7af76e160690a001ee6f70cb53aa25f7cfdfda49cbaa51b2c7bba0a2bbefc7717601' && user_id=='0'){
      this.usuarioExiste=false;
      this.idTipoUsuario=0;
    }else{
      if(hashCookie=='978bd5877610d24d6f17d259522429c55710f33c6629aea9c95cae39a82ed740541872907ba03d439269dec7d3b1b0ebcfef5831ea0f3f8acbb1daff1577de8d' && user_id!='0'){
        this.usuarioExiste=true;
        this.idTipoUsuario=1;
      }else{
        if(hashCookie=='e4b7b5b1162da37abeff1df9ad7590fdf2197ac7a00acfec38d78c666a4df1f60663675ee40df49dff7ae5f93993d72b75a4de998e6f0af063d6348a2c97a74c' && user_id!='0'){
          this.usuarioExiste=true;
          this.idTipoUsuario=2;
        }
      }
    }
  }
  cerrarSesion(){
    this.cookieService.set('session_id','e642d18c9ac8d605574e902d39f302a733ac35742f219a9127ce16df1a6e7af76e160690a001ee6f70cb53aa25f7cfdfda49cbaa51b2c7bba0a2bbefc7717601');
    this.cookieService.set('user_id','0');
    window.location.reload();
  }
  constructor(private router:Router, private cookieService:CookieService){}
}
