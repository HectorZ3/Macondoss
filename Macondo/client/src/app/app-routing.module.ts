import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoxdComponent } from './components/carritoxd/carritoxd.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormularioInformacionComponent } from './components/formulario-informacion/formulario-informacion.component';
import { OpProductoComponent } from './components/op-producto/op-producto.component';
import { PedidoService } from './services/pedido.service';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/inicio",
    pathMatch:"full"
  },
  {
    path:"inicio",
    component:InicioComponent
  },
  {
    path:"carrito",
    component:CarritoxdComponent
  },
  {
    path:"informacion",
    component:FormularioInformacionComponent
  },
  {
    path:"op-producto",
    component:OpProductoComponent
  },
  {
    path:"pedidos",
    component:PedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
