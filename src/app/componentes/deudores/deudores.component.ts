import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray,FormBuilder } from '@angular/forms';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { Concepto } from 'src/app/modelos/concepto';
import { ConceptoService } from 'src/app/servicios/concepto.service';
import { ConsumoService } from 'src/app/servicios/consumo.service';
import { SocioService } from 'src/app/servicios/socio.service';
import { Socio } from 'src/app/modelos/socio';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.scss']
})
export class DeudoresComponent implements OnInit {

  // define el formulario
  public formulario: FormGroup;
  // define el formulario para Historial
  public formularioHistorial: FormGroup;
  //Define la lista completa de registros
  public listaHistorialDeudas:Array<any> = [];
  //Define la lista de deudas del socio
  public listaSocioDedudas:Array<any> = [];
  //Define la lista de deudores
  public listaDeudores:Array<any> = [];
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();
  // define el autocompletado como un formControl
  public autocompletadoHistorial: FormControl=new FormControl();
  
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define el id del registro
  public id: FormControl=new FormControl();
  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;
  //Define si el campo es de solo lectura
  public soloLectura:boolean = false;
  //Define si mostrar el boton
  public mostrarBoton:boolean = null;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  //Define la lista de resultados de busqueda
  public socios:Array<any> = [];
  //Define la lista para deudas añadidas para SALDAR
  public deudasASaldar:Array<any> = [];
  //Define la lista para deudas añadidas para SALDAR
  public consumoASaldar:Array<any> = [];
  //Define la bandera si el check esta en true o false
  public bandera: boolean;

  
  constructor(private formBuilder: FormBuilder, private socio: Socio, public dialog: MatDialog,  private socioService: SocioService, private consumoServicio: ConsumoService, private toastr: ToastrService) {
     
   }

  
  ngOnInit() {
    //inicializa el formulario 
    this.formulario= new FormGroup({});
    //inicializa el formulario historial
    this.formularioHistorial= new FormGroup({});
    //Establece la pestania activa por defecto
    this.activeLink = 1;
    //Establece el indice activo por defecto
    this.indiceSeleccionado = 1;
    //Lista todos los deudores
    this.listarDeudores();
    //Controla el autocompletado
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.socioService.listarPorAlias(data).subscribe(res => {
          this.socios = res.json();
        })
      }
    })
    //Controla el autocompletado
    this.autocompletadoHistorial.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.socioService.listarPorAlias(data).subscribe(res => {
          this.socios = res.json();
        })
      }
    })
  }
  //Establece el formulario al seleccionar elemento del autocompletado
  public cambioAutocompletado() {
    this.consumoServicio.listarDeudasPorSocio(this.autocompletado.value.id).subscribe(res=>{
      this.listaSocioDedudas= res.json();
    });
  }
  //Establece el formulario al seleccionar elemento del autocompletado
  public cambioHistorial() {
    this.consumoServicio.listarDeudasPorSocio(this.autocompletadoHistorial.value.id).subscribe(res=>{
      this.listaHistorialDeudas= res.json();
    });
  }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.alias ? elemento.alias : elemento;
    } else {
      return elemento;
    }
  }
  //Establece valores al seleccionar una pestania
  public seleccionarPestania(id, nombre) {
    this.autocompletado.reset();
    this.listaSocioDedudas=[];
    this.indiceSeleccionado = id;
    this.activeLink = nombre;
    this.listarDeudores();
}
//Funcion para determina que accion se requiere (Agregar, Actualizar, Eliminar)
public accion(indice) {
  switch (indice) {
    case 1:
      //this.saldar();
      break;
    default:
      break;
  }
}
// Lista todos los deudores
  private listarDeudores(){
    this.consumoServicio.listar().subscribe(
      res => {
        this.listaDeudores=res.json();
        console.log(this.listaDeudores);
      },
      err => {
      }
    );
  }
  //Agrega un registro 
  /*
  private agregar(){
    var usuario={
      id: 1
    }
    this.formulario.get('usuarioAlta').setValue(usuario);
    console.log(this.formulario.value);
    this.conceptoService.agregar(this.formulario.value).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 201) {
          this.reestablecerFormulario(respuesta.id);
          setTimeout(function() {
            document.getElementById('idNombre').focus();
          }, 20);
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 11002) {
          document.getElementById("labelNombre").classList.add('label-error');
          document.getElementById("idNombre").classList.add('is-invalid');
          document.getElementById("idNombre").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
  } */
  //Manejo de colores de campos y labels
  public cambioCampo(id, label) {
    document.getElementById(id).classList.remove('is-invalid');
    document.getElementById(label).classList.remove('label-error');
  };
  //Determina que accion realizar con el Consumo (segun si es checkeado)
  public accionConsumo(pago, $event, indice){
    if($event.checked==true){
      this.agregarConsumo(pago, $event);
    }else{
      this.eliminarConsumo(indice);
    }
  }
  // añade una deuda a la lista para saldar
  public agregarConsumo(deuda, $event) {
    console.log($event.checked);
    deuda.bandera=$event.checked;
    this.consumoASaldar.push(deuda);
    console.log(this.consumoASaldar);
  }
  // elimina una deuda seleccionada de la lista
  public eliminarConsumo(indice) {
    this.consumoASaldar.splice(indice, 1); 
    console.log(this.consumoASaldar);
  }
  //declaramos los metodos para utilizar el Modal para detalles de la Deuda del Socio (Primer pestaña)
  public detalleDeudaSocio(deuda, saldar): void {
    const dialogRef = this.dialog.open(DetalleModal, {
      width: '750px',
      data: {Pagos: deuda, saldar: saldar},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  //Muestra en la pestania buscar el elemento seleccionado de listar
  public activarConsultarDeudor(deudor) {
    this.seleccionarPestania(1, "Consultar");
    this.autocompletado.setValue(deudor);
    this.cambioAutocompletado();
    console.log(deudor);
  }
}

@Component({
  selector: 'detalle-modal',
  templateUrl: 'detalle-modal.html',
})
export class DetalleModal{
  //Define la lista completa de pagos
  public pagosConsumoSocio :FormArray ;
  //Define si permite la opcion Saldar
  public mostrarSaldar:boolean;
  //Define la lista para deudas añadidas para SALDAR
  public pagosASaldar:Array<any> = [];
  constructor(public dialogRef: MatDialogRef<DetalleModal>, @Inject(MAT_DIALOG_DATA) public data) {}
  
   ngOnInit() {
     this.pagosConsumoSocio=this.data.Pagos.pagos;
     this.mostrarSaldar=this.data.saldar;
     console.log(this.mostrarSaldar);
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  //Determina que accion realizar con el Pago (segun si es checkeado)
  public accionPago(pago, $event, indice){
    if($event.checked==true){
      this.agregarPago(pago, $event);
    }else{
      this.eliminarPago(indice);
    }
  }
  // añade un pago a la lista para saldar
  public agregarPago(pago, $event) {
    console.log($event);
    var bandera= $event.checked;
    pago.bandera=bandera; //añade un nuevo campo "bandera" para saber si fue checkeado
    this.pagosASaldar.push(pago); //Luego lo agrega a la lista de pagos a Saldar
    console.log(this.pagosASaldar);
  }
  // elimina un pago seleccionado de la lista
  public eliminarPago(indice) {
    this.pagosASaldar.splice(indice, 1); 
    console.log(this.pagosASaldar);
  }
}

