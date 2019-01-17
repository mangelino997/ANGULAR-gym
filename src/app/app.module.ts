import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatDividerModule,
  MatSelectModule, MatTabsModule, MatIconModule, MatCardModule, MatSidenavModule,
  MatAutocompleteModule, MatInputModule, MatRadioModule, MatTableModule, MatDialogModule,
  MatProgressBarModule, MatTooltipModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


//COMPONENTES
import { ModuloComponent } from './componentes/modulo/modulo.component';
import { SubopcionComponent } from './componentes/subopcion/subopcion.component';
import { PestaniaComponent } from './componentes/pestania/pestania.component';
import { RolComponent } from './componentes/rol/rol.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { ActividadExtraComponent } from './componentes/actividad-extra/actividad-extra.component';
import { ConceptoComponent } from './componentes/concepto/concepto.component';
import { EjercicioComponent } from './componentes/ejercicio/ejercicio.component';
import { LesionComponent } from './componentes/lesion/lesion.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { VentaComponent } from './componentes/venta/venta.component';
import { ToolbarComponent } from './componentes/home/toolbar/toolbar/toolbar.component';
import { ToolbarProfileComponent } from './componentes/home/toolbar/toolbar-profile/toolbar-profile.component';
import { HeaderComponent } from './componentes/home/sidenav/header/header/header.component';
import { LogoComponent } from './componentes/home/sidenav/header/logo/logo.component';
import { SidenavComponent } from './componentes/home/sidenav/sidenav/sidenav.component';
import { FooterComponent } from './componentes/home/footer/footer.component';
import { SocioComponent } from './componentes/socio/socio.component';
import { CumpleaniosComponent } from './componentes/cumpleanios/cumpleanios.component';
import { ToolbarMenuComponent } from './componentes/home/toolbar-menu/toolbar-menu.component';

//SERVICIOS
import { SubopcionService } from './servicios/subopcion.service';
import { ModuloService } from './servicios/modulo.service';
import { RolService } from './servicios/rol.service';
import { PestaniaService } from './servicios/pestania.service';
import { UsuarioService } from './servicios/usuario.service';
import { SubopcionPestaniaService } from './servicios/subopcion-pestania.service';
import { ActividadService } from './servicios/actividad.service';
import { ActividadExtraService } from './servicios/actividad-extra.service';
import { ConceptoService } from './servicios/concepto.service';
import { EjercicioService } from './servicios/ejercicio.service';
import { FotoService } from './servicios/foto.service';
import { LesionService } from './servicios/lesion.service';
import { GrupoGeneralService } from './servicios/grupo-general.service';
import { GrupoMaquinaService } from './servicios/grupo-maquina.service';
import { GrupoMuscularService } from './servicios/grupo-muscular.service';
import { ProfesorService } from './servicios/profesor.service';
import { VentaService } from './servicios/venta.service';
import { SocioService } from './servicios/socio.service';

//MODELOS
import { Usuario } from './modelos/usuario';
import { Modulo } from './modelos/modulo';
import { Subopcion } from './modelos/subopcion';
import { Pestania } from './modelos/pestania';
import { Rol } from './modelos/rol';
import { Actividad } from './modelos/actividad';
import { ActividadExtra } from './modelos/actividadExtra';
import { Concepto } from './modelos/concepto';
import { Ejercicio } from './modelos/ejercicio';
import { Foto } from './modelos/foto';
import { Lesion } from './modelos/lesion';
import { Profesor } from './modelos/profesor';
import { Socio } from './modelos/socio';
import { Venta } from './modelos/venta';
import { VenceHoyComponent } from './componentes/vence-hoy/vence-hoy.component';
import { VenceManianaComponent } from './componentes/vence-maniana/vence-maniana.component';


@NgModule({
  declarations: [
    AppComponent,
    ModuloComponent,
    SubopcionComponent,
    PestaniaComponent,
    RolComponent,
    UsuarioComponent,
    ActividadComponent,
    ActividadExtraComponent,
    ConceptoComponent,
    EjercicioComponent,
    LesionComponent,
    ProfesorComponent,
    SocioComponent,
    VentaComponent,
    CumpleaniosComponent,
    ToolbarComponent,
    ToolbarProfileComponent,
    HeaderComponent,
    LogoComponent,
    SidenavComponent,
    FooterComponent,
    ToolbarMenuComponent,
    VenceHoyComponent,
    VenceManianaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatTooltipModule,
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
    ActividadExtraService,
    ConceptoService,
    EjercicioService,
    FotoService,
    LesionService,
    GrupoGeneralService,
    GrupoMaquinaService,
    GrupoMuscularService,
    ProfesorService,
    SocioService,
    VentaService,
    Usuario,
    Modulo,
    Subopcion,
    Pestania,
    Rol,
    Actividad,
    ActividadExtra,
    Concepto,
    Ejercicio,
    Foto,
    Lesion,
    Profesor,
    Socio,
    Venta

  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }