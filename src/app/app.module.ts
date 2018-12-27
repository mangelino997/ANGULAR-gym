import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatDividerModule,
  MatSelectModule, MatTabsModule, MatIconModule, MatCardModule, MatSidenavModule,
  MatAutocompleteModule, MatInputModule, MatRadioModule, MatTableModule, MatDialogModule,
  MatProgressBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';




//COMPONENTES
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { SubopcionComponent } from './componentes/subopcion/subopcion.component';
import { PestaniaComponent } from './componentes/pestania/pestania.component';
import { RolComponent } from './componentes/rol/rol.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { ActividadExtraComponent } from './componentes/actividad-extra/actividad-extra.component';
//SERVICIOS
import { SubopcionService } from './servicios/subopcion.service';
import { ModuloService } from './servicios/modulo.service';
import { RolService } from './servicios/rol.service';
import { PestaniaService } from './servicios/pestania.service';
import { UsuarioService } from './servicios/usuario.service';
import { SubopcionPestaniaService } from './servicios/subopcion-pestania.service';
import { ActividadService } from './servicios/actividad.service';
import { ActividadExtraService } from './servicios/actividad-extra.service';
//MODELOS
import { Usuario } from './modelos/usuario';
import { Modulo } from './modelos/modulo';
import { Subopcion } from './modelos/subopcion';
import { Pestania } from './modelos/pestania';
import { Rol } from './modelos/rol';
import { Actividad } from './modelos/actividad';
import { ActividadExtra } from './modelos/actividadExtra';




@NgModule({
  declarations: [
    AppComponent,
    ModuloComponent,
    SubopcionComponent,
    PestaniaComponent,
    RolComponent,
    UsuarioComponent,
    ActividadComponent,
    ActividadExtraComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    HttpModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    ModuloService,
    SubopcionService,
    SubopcionPestaniaService,
    ActividadService,
    RolService,
    PestaniaService,
    UsuarioService,
    ModuloService,
    ActividadExtraService,
    Usuario,
    Modulo,
    Subopcion,
    Pestania,
    Rol,
    Actividad,
    ActividadExtra

  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }