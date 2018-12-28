import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PestaniaComponent } from './componentes/pestania/pestania.component';
import { SubopcionComponent } from './componentes/subopcion/subopcion.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { ActividadExtraComponent } from './componentes/actividad-extra/actividad-extra.component';
import { ConceptoComponent } from './componentes/concepto/concepto.component';
import { EjercicioComponent } from './componentes/ejercicio/ejercicio.component';
import { LesionComponent } from './componentes/lesion/lesion.component';

const routes: Routes = [
  {path: '', component: EjercicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
