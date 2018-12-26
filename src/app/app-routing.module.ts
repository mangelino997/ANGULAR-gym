import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PestaniaComponent } from './componentes/pestania/pestania.component';

const routes: Routes = [
  {path: '', component: ModuloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
