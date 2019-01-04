import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/modelos/venta';
import { SocioService } from 'src/app/servicios/socio.service';
import { ConceptoService } from 'src/app/servicios/concepto.service';
import { VentaService } from 'src/app/servicios/venta.service';

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
  public listaCompleta:Array<any> = [];
  //Define la lista completa de registros
  public listaAgregar:Array<any> = [];
  //Define la lista para tipo de factura
  public listaConcepto:Array<any> = [];
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define el nombre del concepto seleccionado
  public nombreDelConcepto:string = null;
  //Define el nombre del socio seleccionado
  public nombreDelSocio:string = null;
  
  //Define el importe del concepto seleccionado
  public importeDelConcepto:number = 0;

  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;

  //Define si habilita el boton agregar
  public habilitado:boolean = false;
  //Define un boolean para mostrar determinados campos
  public mostrarMesAPagar:boolean = false;
  
  //Define si el campo es de solo lectura
  public soloLectura:boolean = true;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  // define al input socio como un FormControl 
  public socio: FormControl=new FormControl();
  // define al input concepto como un FormControl 
  public concepto: FormControl=new FormControl();
  // define al input cantidad como un FormControl 
  public cantidad: FormControl=new FormControl();
  
  // define importeConcepto como un FormControl 
  public importeConcepto: FormControl=new FormControl();
  // define al input importe como un FormControl 
  public importe: FormControl=new FormControl();
  public elemento: Array<any> = [];
  //Define el form control para las busquedas vendedor
  public buscarTipoFormulario:FormControl = new FormControl();
  //Define la lista de resultados de socios
  public resultadoSocio = [];

  constructor(private conceptoService: ConceptoService ,private socioService: SocioService, private ventaService: VentaService ,private venta: Venta, private formBuilder: FormBuilder, private toastr: ToastrService) {
    //Autocompletado - Buscar por Tipo de formulario
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.socioService.listarPorAlias(data).subscribe(response =>{
          this.resultadoSocio = response.json();
          console.log(this.resultadoSocio);
        })
      }
    })
    //Establece la pestania activa por defecto
    this.activeLink = 1;
    //Establece el indice activo por defecto
    this.indiceSeleccionado = 1;

   }

  ngOnInit() {
    //obtenemos la fecha actual
    var dateDay = new Date().toISOString().substring(0,10);
    //inicializa el formulario y sus elementos
    this.formulario= this.venta.formulario;
    this.formulario.get('fecha').setValue(dateDay);
    //define el formulario de Consumos que es de tipo array (puede tener varias filas)
    this.formularioConsumo = this.formBuilder.group({
      importe: '',
      cantidad: '',
      concepto: '',
      mes: '',
      anio: ''
    });
    //inicializa el select de concepto
    this.listarConcepto();
  }
  // Carga en el select de Concepto
  private listarConcepto(){
    this.conceptoService.listar().subscribe(
      res => {
        this.listaConcepto=res.json();
        console.log(this.listaConcepto);
      },
      err => {
        console.log(err);
      }
    );
  }
  //Manejo de cambio de autocompletado de tipo formulario
  public cambioAutocompletadoSocio(elemento) {
    this.formulario.get('idSocio').setValue(elemento.id);
    this.nombreDelSocio=elemento.nombre;
    console.log(this.formularioConsumo);
    this.socioService.esDeudor(elemento.id).subscribe(res=>{
      let respuesta= res.json();
      console.log(respuesta);
      if(respuesta== true){
        this.toastr.error("El Socio es Deudor!");
      }
    })
  }
  //Maneja el cambio de tipo de concepto
  public cambioAutocompletadoConcepto(elemento) {
    this.importeDelConcepto=0;
    this.nombreDelConcepto="";
    this.mostrarMesAPagar=null;
    this.formulario.get('idConcepto').setValue(elemento.id);
    console.log(this.formulario.get('idSocio').value);
    if(elemento.id==1){
      this.mostrarMesAPagar=true;
      //valores de prueba
      let importe=500;
      this.formularioConsumo.get('concepto').setValue(elemento.nombre);
      this.formularioConsumo.get('importe').setValue(importe);
      this.importe.setValue(importe);
      console.log(this.formulario.value);
      //Valores posta
      // this.socioService.obtenerImporteYEsDeudor(this.formulario.get('idSocio').value).subscribe(res=>{
      //   let respuesta= res.json();
      //   console.log(respuesta);
      //   this.formularioConsumo.get('concepto').setValue(elemento.nombre);
      //   this.formularioConsumo.get('importe').setValue(importe);
      // });
    }else{
      this.mostrarMesAPagar=false;
      this.importeDelConcepto=elemento.importe;
      this.nombreDelConcepto=elemento.nombre;
    }
  }
  
  //Calcular Importe cuando el concepto sea != 1 || diferente de "cuota"
  public calcularImporteSiNoEsCuota(){
    //seteo como que si es deudor para probarlo
    let importe=this.cantidad.value*this.importeDelConcepto;
    this.importe.setValue(importe);
    this.formularioConsumo.get('cantidad').setValue(this.cantidad.value);        
    this.formularioConsumo.get('importe').setValue(this.importe.value);     
    this.formularioConsumo.get('concepto').setValue(this.nombreDelConcepto);   
    }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.nombre ? elemento.nombre : elemento;
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
    this.formularioConsumo.get('mes').setValue(this.formulario.get('mes').value);
    this.formularioConsumo.get('anio').setValue(this.formulario.get('anio').value);
    this.listaAgregar.push(this.formularioConsumo.value);
    let monto=<number>this.formularioConsumo.get('importe').value;
    let montoTotal= <number>this.formulario.get('importeTotal').value;
    let importeTotal: number= montoTotal + monto;
    this.formulario.get('importeTotal').setValue(importeTotal);
    document.getElementById('idSocio').focus();
    this.autocompletado.disable();
    this.reestablecerFormulario();

  }
  //Elimina una fila de la segunda tabla
  public eliminarElemento(indice, montoRestar) {
    let montoTotal= this.formulario.get('importeTotal').value;
    this.formulario.get('importeTotal').setValue(montoTotal-montoRestar);
    this.listaAgregar.splice(indice, 1); 
    if(this.listaAgregar.length==0){
      this.autocompletado.enable();
      this.autocompletado.reset();
    }
    else{
      this.autocompletado.disable();
    }
  }
  //Agrega un registro 
public agregar(){
  this.formulario.get('consumos').setValue(this.listaAgregar);// Agrego el array de consumos agregados a la lista
  console.log(this.formulario.value);
  // this.ventaService.agregar(this.formulario.value).subscribe(
  //   res => {
  //     var respuesta = res.json();
  //     if(respuesta.codigo == 201) {
  //       this.autocompletado.reset();
  //       this.listaAgregar = [];
  //       this.reestablecerFormulario();
  //       this.formulario.reset();
  //       setTimeout(function() {
  //         document.getElementById('idSocio').focus();
  //       }, 20);
  //       this.toastr.success(respuesta.mensaje);
  //     }
  //   },
  //   err => {
  //     var respuesta = err.json();
  //     if(respuesta.codigo == 11002) {
  //       document.getElementById("idSocio").focus();
  //       this.toastr.error(respuesta.mensaje);
  //     }
  //   }
  // );
}
//Reestablece los campos formularios
private reestablecerFormulario() {
  this.cantidad.reset();
  this.importe.reset();
  this.cantidad.setValue(0);
  this.concepto.reset();
  this.formulario.get('mes').reset();
  this.formulario.get('anio').reset();
  this.importeDelConcepto=0;
  this.nombreDelConcepto="";
  }
}
