import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { ActividadExtra } from 'src/app/modelos/actividadExtra';
import { ActividadExtraService } from 'src/app/servicios/actividad-extra.service';

@Component({
  selector: 'app-actividad-extra',
  templateUrl: './actividad-extra.component.html',
  styleUrls: ['./actividad-extra.component.scss']
})
export class ActividadExtraComponent implements OnInit {

  // define el formulario
  public formulario: FormGroup;
  //Define la lista completa de registros
  public listaCompleta:Array<any> = [];
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;
  //Define si el campo es de solo lectura
  public soloLectura:boolean = false;
  //Define si mostrar el boton
  public mostrarBoton:boolean = null;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  //Define la lista de resultados de busqueda
  public resultados:Array<any> = [];
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(private actividadExtra: ActividadExtra ,private actividadExtraService: ActividadExtraService ,private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService) {
   
   }

  ngOnInit() {
    //inicializa el formulario y sus elementos
    this.formulario= this.actividadExtra.formulario;
    //inicializa el valor por defecto en el campo Importe
    this.actividadExtraService.listar().subscribe(res=>{
      var respuesta = res.json();
      this.formulario.setValue(respuesta[0]);
    })
    
    
  }
  //Actualiza un registro
  public actualizar(){
    this.actividadExtraService.actualizar(this.formulario.value).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 200) {
          this.formulario.reset();
          setTimeout(function() {
            document.getElementById('idImporte').focus();
          }, 20);
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 11002) {
          document.getElementById("idImporte").classList.add('is-invalid');
          document.getElementById("idImporte").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
  }


}
