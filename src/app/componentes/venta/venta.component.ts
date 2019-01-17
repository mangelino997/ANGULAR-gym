import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/modelos/venta';
import { SocioService } from 'src/app/servicios/socio.service';
import { ConceptoService } from 'src/app/servicios/concepto.service';
import { VentaService } from 'src/app/servicios/venta.service';
import { FechaService } from 'src/app/servicios/fecha.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  // define el formulario de la pestaña "Transferencia de Almacen a Mostrador"
  public formulario: FormGroup;
  // define el formulario Consumo"
  public formularioConsumo: FormGroup;
  //Define la lista completa de registros
  public listaAgregar:Array<any> = [];
  //Define la lista para tipo de Conceptos
  public listaConcepto:Array<any> = [];
  //Define la lista para Años
  public listYears:Array<any> = [];
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define el importe del concepto seleccionado
  public importeDelConcepto:number = 0;
  //Define si mostrar el autocompletado socio
  public socioHabilitado:boolean = false;
  //Define si habilita el boton agregar
  public habilitado:boolean = false;
  //Define un boolean para mostrar determinados campos
  public mostrarMesAPagar:boolean = false;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  //Define la lista de resultados de socios
  public resultadoSocio = [];

  constructor(private fechaService: FechaService ,private conceptoService: ConceptoService ,private socioService: SocioService, private ventaService: VentaService ,private venta: Venta, private formBuilder: FormBuilder, private toastr: ToastrService) {
    //Establece la pestania activa por defecto
    this.activeLink = 1;
    //Establece el indice activo por defecto
    this.indiceSeleccionado = 1;
   }
  ngOnInit() {
    // obtenemos la fecha actual
    var dateDay = new Date().toISOString().substring(0,10);
    // inicializa el formulario y sus elementos
    this.formulario= this.venta.formulario;
    this.formulario.get('fecha').setValue(dateDay);
    // define el formulario de Consumos que es de tipo array (puede tener varias filas)
    this.formularioConsumo= this.venta.formularioConsumo;
    // inicializa el select de concepto
    this.listarConcepto();
    // inicializa el select de años
    this.listarAnios();
    setTimeout(function() {
      document.getElementById('idFecha').focus();
    }, 20);    
    //Autocompletado - Buscar por Socio
    this.formulario.get('socio').valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.socioService.listarPorAlias(data).subscribe(response =>{
          this.resultadoSocio = response.json();
        })
      }
    })
  }
  // Carga en el select de Concepto
  private listarConcepto(){
    this.conceptoService.listar().subscribe(
      res => {
        this.listaConcepto=res.json();
      },
      err => {
        this.toastr.error("No se pueden listar los Conceptos");
      }
    );
  }
  // Carga en el select de Años
  public listarAnios(){
    this.fechaService.listarCincoAnios().subscribe(
      res => {
        this.listYears=res.json();
      },
      err => {
        this.toastr.error("No se pueden listar los años siguientes");
      }
    );
  }
  //Manejo de cambio de autocompletado de tipo formulario
  public cambioAutocompletadoSocio() {
    this.socioService.esDeudor(this.formulario.get('socio').value.id).subscribe(res=>{
      let respuesta= res.json();
      if(respuesta== true){
        this.toastr.error("El Socio es Deudor!");
      }
    })
  }
  //Maneja el cambio de tipo de concepto
  public cambioAutocompletadoConcepto() {
    this.mostrarMesAPagar=null;
    if(this.formularioConsumo.get('concepto').value.id==1){
      this.mostrarMesAPagar=true;
        this.socioService.obtenerImporteYEsDeudor(this.formulario.get('socio').value.id).subscribe(res=>{
         let respuesta= res.json();
         this.formularioConsumo.get('importe').setValue(respuesta.importe);
      });
    }else{
      this.mostrarMesAPagar=false;
      this.importeDelConcepto=this.formularioConsumo.get('concepto').value.importe;
    }
  }
  //Calcular Importe cuando el concepto sea != 1 || diferente de "cuota"
  public calcularImporteSiNoEsCuota(){
    //seteo como que si es deudor para probarlo
    let importe=this.formularioConsumo.get('cantidad').value*this.formularioConsumo.get('concepto').value.importe;
    this.formularioConsumo.get('importe').setValue(importe);  
    }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.nombre ? elemento.nombre : elemento;
    } else {
      return elemento;
    }
  }
  public displayFnAlias(elemento) {
    if(elemento != undefined) {
      return elemento.alias ? elemento.alias : elemento;
    } else {
      return elemento;
    }
  }
  //Define el mostrado de datos y comparacion en campo select
  public compareFn = this.compararFn.bind(this);
  private compararFn(a, b) {
    if(a != null && b != null) {
      return a.id === b.id;
    }
  }
  //Elimina todos los elementos cargados en el array listaAgregar
  public limpiarArray(){
    this.listaAgregar.splice(0, this.listaAgregar.length);
  }
  //Agrega una fila a la  tabla
  public agregarElemento() {
    let usuario= {
      id: 1
    }
    this.formularioConsumo.get('usuarioAlta').setValue(usuario);
    this.formularioConsumo.get('socio').setValue(this.formulario.get('socio').value);
    this.listaAgregar.push(this.formularioConsumo.value);
    this.formulario.get('importeTotal').setValue(<number>this.formulario.get('importeTotal').value + <number>this.formularioConsumo.get('importe').value);
    setTimeout(function() {
      document.getElementById('idConcepto').focus();
    }, 20);
    this.formularioConsumo.get('cantidad').reset();
    this.formularioConsumo.get('importe').reset();
    this.socioHabilitado=true;
    console.log(this.listaAgregar);
  }
  //Elimina una fila de la segunda tabla
  public eliminarElemento(indice, montoRestar) {
    // let montoTotal= this.formulario.get('importeTotal').value;
    this.formulario.get('importeTotal').setValue(this.formulario.get('importeTotal').value-montoRestar);
    this.listaAgregar.splice(indice, 1); 
    if(this.listaAgregar.length==0){
      this.formulario.get('socio').enable();
      this.formulario.get('importeTotal').setValue(0);
      setTimeout(function() {
        document.getElementById('idSocio').focus();
      }, 20);
    }
    else{
      this.formulario.get('socio').disable();
    }
  }
//Agrega un registro 
public agregar(){
  let usuario= {
    id: 1
  }
  this.formulario.get('consumos').setValue(this.listaAgregar);// Agrego el array de consumos agregados a la lista
  this.formulario.get('usuarioAlta').setValue(usuario);
  console.log(this.formulario.value);
  this.ventaService.agregar(this.formulario.value).subscribe(
   res => {
       var respuesta = res.json();
       if(respuesta.codigo == 201) {
         this.listaAgregar = [];
         this.reestablecerFormulario();
         setTimeout(function() {
           document.getElementById('idSocio').focus();
         }, 20);
         this.toastr.success(respuesta.mensaje);
       }
     },
     err => {
       var respuesta = err.json();
       if(respuesta.codigo == 11002) {
         document.getElementById("idSocio").focus();
         this.toastr.error(respuesta.mensaje);
       }
     }
   );
}
//Reestablece los campos formularios
private reestablecerFormulario() {
  this.formulario.reset();
  this.formularioConsumo.reset();
  this.socioHabilitado=false;
  }
}
