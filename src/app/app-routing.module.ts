import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PestaniaComponent } from './componentes/pestania/pestania.component';
import { SubopcionComponent } from './componentes/subopcion/subopcion.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { ActividadExtraComponent } from './componentes/actividad-extra/actividad-extra.component';
import { ConceptoComponent } from './componentes/concepto/concepto.component';

const routes: Routes = [
  {path: '', component: ConceptoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
