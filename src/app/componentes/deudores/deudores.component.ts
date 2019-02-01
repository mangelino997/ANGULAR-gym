import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  //Define la lista de deudas del socio
  public socioDeuda:Array<any> = [];
  
  constructor(private socio: Socio, public dialog: MatDialog,  private socioService: SocioService, private consumoServicio: ConsumoService, private toastr: ToastrService) {
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.socioService.listarPorAlias(data).subscribe(res => {
          this.socios = res.json();
        })
      }
    })
   }

  //declaramos los metodos para utilizar el Modal/Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DetalleModal, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit() {
    //inicializa el formulario
    this.formulario= this.socio.formulario;
    //Establece los valores, activando la primera pestania 
    this.seleccionarPestania(1, 'Consultar', 0);
    //Lista todos los deudores
    this.listarDeudores();
  }
  //Establece el formulario al seleccionar elemento del autocompletado
  public cambioAutocompletado(elemento) {
    this.formulario.patchValue(elemento);
  }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.nombre ? elemento.nombre : elemento;
    } else {
      return elemento;
    }
  }
  //Funcion para establecer los valores de las pestañas
  private establecerValoresPestania(nombrePestania, autocompletado, soloLectura, boton, componente) {
    this.pestaniaActual = nombrePestania;
    this.mostrarAutocompletado = autocompletado;
    this.soloLectura = soloLectura;
    this.mostrarBoton = boton;
    /*setTimeout(function () {
      document.getElementById(componente).focus();
    }, 20); */
  };
  //Establece valores al seleccionar una pestania
  public seleccionarPestania(id, nombre, opcion) {
    this.formulario.reset();
    this.indiceSeleccionado = id;
    this.activeLink = nombre;
    this.listarDeudores();
    /*
    * Se vacia el formulario solo cuando se cambia de pestania, no cuando
    * cuando se hace click en ver o mod de la pestania lista
    */
   if(opcion == 0) {
    this.autocompletado.setValue(undefined);
    this.socios = [];
  }
  switch (id) {
    case 1:
      this.establecerValoresPestania(nombre, false, false, true, 'idNombre');
      break;
    case 2:
      this.establecerValoresPestania(nombre, true, true, true, 'idAutocompletado');
      break;
    case 3:
      this.establecerValoresPestania(nombre, true, true, false, 'idAutocompletado');
      break;
    default:
      break;
  }
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
        this.listaCompleta=res.json();
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
  //Reestablece los campos formularios
  private reestablecerFormulario(id) {
    this.formulario.reset();
    this.formulario.get('id').setValue(id);
    this.autocompletado.setValue(undefined);
    this.socios = [];
    this.listarDeudores();
  }
  //Manejo de colores de campos y labels
  public cambioCampo(id, label) {
    document.getElementById(id).classList.remove('is-invalid');
    document.getElementById(label).classList.remove('label-error');
  };
  //Muestra en la pestania buscar el elemento seleccionado de listar
  public activarConsultar(elemento) {
    this.seleccionarPestania(2, this.pestanias[1].pestania.nombre, 1);
    this.autocompletado.setValue(elemento);
    this.formulario.patchValue(elemento);
    this.id.setValue(elemento.id);
  }
  //Maneja los evento al presionar una tacla (para pestanias y opciones)
  public manejarEvento(keycode) {
    var indice = this.indiceSeleccionado;
    if(keycode == 113) {
      if(indice < this.pestanias.length) {
        this.seleccionarPestania(indice+1, this.pestanias[indice].pestania.nombre, 0);
      } else {
        this.seleccionarPestania(1, this.pestanias[0].pestania.nombre, 0);
      }
    }
  }
  //Busca las deudas del socio seleccionado
  public consultarDeudas(){
    this.consumoServicio.listarDeudasPorSocio(this.formulario.get('id').value).subscribe(res=>{
      this.socioDeuda= res.json();
    });
  }
}

@Component({
  selector: 'detalle-modal',
  templateUrl: 'detalle-modal.html',
})
export class DetalleModal{
  constructor(public dialogRef: MatDialogRef<DetalleModal>, private socio: Socio, public dialog: MatDialog,  private socioService: SocioService, private consumoServicio: ConsumoService,) {}

   ngOnInit() {
   //inicializa el formulario para agregar un autorizado y sus elementos
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}

