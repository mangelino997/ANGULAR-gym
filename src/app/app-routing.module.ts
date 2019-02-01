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
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { SocioComponent } from './componentes/socio/socio.component';
import { VentaComponent } from './componentes/venta/venta.component';
import { RolComponent } from './componentes/rol/rol.component';
import { CumpleaniosComponent } from './componentes/cumpleanios/cumpleanios.component';
import { VenceHoyComponent } from './componentes/vence-hoy/vence-hoy.component';
import { VenceManianaComponent } from './componentes/vence-maniana/vence-maniana.component';
import { VencidosComponent } from './componentes/vencidos/vencidos.component';
import { PrincipalComponent } from './componentes/home/principal/principal.component';
import { DeudoresComponent } from './componentes/deudores/deudores.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'sociosadministrar', component: SocioComponent},
  {path: 'sociosvencidos', component: VencidosComponent},
  {path: 'sociosvencenhoy', component: VenceHoyComponent},
  {path: 'sociosvencenmanana', component: VenceManianaComponent},
  {path: 'socioscumpleanos', component: CumpleaniosComponent},
  {path: 'administracionproductos', component: ConceptoComponent},
  {path: 'administracionpagocuota', component: VentaComponent},

  
  //{path: 'administracionventas', component: VentaComponent},
  {path: 'actividadesadministrar', component: ActividadComponent},
  {path: 'profesoresadministrar', component: ProfesorComponent},
  {path: 'planesejercicios', component: EjercicioComponent},
  {path: 'planeslesiones', component: LesionComponent},
  {path: 'usuariosadministrar', component: UsuarioComponent},
  {path: 'usuariosroles', component: RolComponent},
  {path: 'actividadesimporteactextra', component: ActividadExtraComponent},
  {path: 'sociosdeudores', component: DeudoresComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
