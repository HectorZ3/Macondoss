import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CarritoxdComponent } from './components/carritoxd/carritoxd.component';
import { FormularioInformacionComponent } from './components/formulario-informacion/formulario-informacion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { OpProductoComponent } from './components/op-producto/op-producto.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CarritoxdComponent,
    FormularioInformacionComponent,
    InicioComponent,
    OpProductoComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
