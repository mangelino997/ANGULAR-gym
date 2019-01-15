import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { FotoService } from 'src/app/servicios/foto.service';
import { Foto } from 'src/app/modelos/foto';
import * as $ from 'jquery';
import { LesionService } from 'src/app/servicios/lesion.service';
import { GrupoMuscularService } from 'src/app/servicios/grupo-muscular.service';
import { GrupoMaquinaService } from 'src/app/servicios/grupo-maquina.service';
import { GrupoGeneralService } from 'src/app/servicios/grupo-general.service';
import { AppService } from 'src/app/servicios/app.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})

export class EjercicioComponent implements OnInit {

  // define el formulario
  public formulario: FormGroup;
  // define el formulario para Foto
  public formularioFoto: FormGroup;
  //Definimos la variable donde guardaremos la foto
  public archivo: File=null;
  //Define la lista completa de registros
  public listaCompleta:Array<any> = [];
  // define la lista de pestañas 
  public pestanias: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();
  // define el id como un formControl
  public id: FormControl=new FormControl();
  // define el autocompletado de Lesiones como un formControl
  public lesiones: FormControl=new FormControl();
  //Define la pestania actual seleccionada
  public pestaniaActual:string = null;
  //Define la pestania actual seleccionada
  public lesionElegida:Array<any> = [];
  
  //Define si mostrar el autocompletado
  public mostrarAutocompletado:boolean = null;
  //Define si el campo es de solo lectura
  public soloLectura:boolean = false;
  //Define si mostrar el boton
  public mostrarBoton:boolean = null;
  //Define si el segundo <img> en subir imagen se muestra o no
  public muestraImagenPc: boolean=null;
  //Define el indice seleccionado de pestania
  public indiceSeleccionado:number = null;
  //Define la lista de resultados de busqueda
  public resultados:Array<any> = [];
  //Define la lista para mostrar las Lesiones en el autocompletado
  public listaLesiones:Array<any> = [];
  //Define la lista para las Lesiones seleccionadas 
  public listaLesionesAgregadas:Array<any> = [];
  //Define la lista para las Lesiones seleccionadas por su id
  public listaLesionesAgregadasId:Array<any> = [];
  
  //Define la lista para Grupos Generales
  public listaGrupoGenerales:Array<any> = [];
  //Define la lista para Grupos Musculares
  public listaGrupoMusculares:Array<any> = [];
  //Define la lista para Grupos Maquinas
  public listaGrupoMaquinas:Array<any> = [];
  // guarda el json del campo Foto del cliente que se selecciono/actualizo
  public fotoCliente: number;
  //id de la foto del cliente para mostrarla en Consultar, Actualizar y Eliminar
  public idFoto: number=1;
  //Define la ip 
  public ip: any;

  bandera: boolean= false;

  //captura el elemento 'inputAutorizado' del dom (como un document.getElementById)
  @ViewChild('inputAutorizado') inputLesiones: ElementRef;
  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(private appService: AppService ,private grupoGeneralService: GrupoGeneralService ,private grupoMaquinaService: GrupoMaquinaService, private grupoMuscularService: GrupoMuscularService, private lesionService: LesionService, private imagenService: ImagenService ,private ejercicio: Ejercicio ,private ejercicioService: EjercicioService ,private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService) {
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.ejercicioService.listarPorNombre(data).subscribe(res => {
          this.resultados = res.json();
        })
      }
    });
    //agregar el metodo de buscar por lesion
    this.lesiones.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.lesionService.listarPorNombre(data).subscribe(res => {
          this.listaLesiones = res.json();
          for(let i=0; i<this.listaLesiones.length; i++){
            for(let j=0; j<this.lesionElegida.length; j++){
              if(this.listaLesiones[i].id==this.lesionElegida[j]){ //si el id=1 significa que es Cuenta Corriente, lo escondo
              
                console.log(this.listaLesiones.splice(i,1));
              }
            }
            
          }
        })
      }
    });
   }

  ngOnInit() {
    //inicializa el formulario y sus elementos
    this.formulario= this.ejercicio.formulario;
    //inicializa el formulario y sus elementos
    this.formularioFoto= new FormGroup({foto: new FormControl()});
    //Carga desde un principio las pestañas "Agregar, Consultar, Actualizar y listar"
    this.subopcionPestaniaServicio.listarPestaniasPorSubopcion(1).subscribe(
      res => {
        this.pestanias= res.json();
        this.activeLink= this.pestanias[0].pestania.nombre;
      }
    );
    //Establece los valores, activando la primera pestania 
    this.seleccionarPestania(1, 'Agregar', 0);
    //Cargar el campo select con los Grupos Generales
    this.listarGruposGenerales();
    //Cargar el campo select con los Grupos Musculares
    this.listarGruposMusculares();
    //Cargar el campo select con los Grupos Maquinas
    this.listarGruposMaquinas();
    //Obtiene la lista completa de registros (los muestra en la pestaña Listar)
    this.listar();
    // inicializa en false
    this.muestraImagenPc=true;
    //Setea la ip
    this.ip= this.appService.URL_BASE;
  }

  //Establece el formulario al seleccionar elemento del autocompletado
  public cambioAutocompletado(elemento) {
    this.formulario.patchValue(elemento);
    this.borrarAgregados();
    this.listarLesiones(elemento);
    this.mostrarFotoCliente(elemento);
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
  private establecerValoresPestania(nombrePestania, autocompletado, soloLectura, boton, deshabilitar, componente) {
    this.pestaniaActual = nombrePestania;
    this.mostrarAutocompletado = autocompletado;
    this.soloLectura = soloLectura;
    this.mostrarBoton = boton;
    if(deshabilitar){
      this.formulario.get('idGrupoGeneral').disable();
      this.formulario.get('idGrupoMuscular').disable();
      this.formulario.get('idGrupoMaquina').disable();
    }
    else {
      this.formulario.get('idGrupoGeneral').enable();
      this.formulario.get('idGrupoMuscular').enable();
      this.formulario.get('idGrupoMaquina').enable();
    }
    setTimeout(function () {
      document.getElementById(componente).focus();
    }, 20);
  };
  //Establece valores al seleccionar una pestania
  public seleccionarPestania(id, nombre, opcion) {
    this.formulario.reset();
    this.indiceSeleccionado = id;
    this.activeLink = nombre;
    this.borrarAgregados();
    this.listar();
    /*
    * Se vacia el formulario solo cuando se cambia de pestania, no cuando
    * cuando se hace click en ver o mod de la pestania lista
    */
   if(opcion == 0) {
    this.autocompletado.setValue(undefined);
    this.lesiones.setValue(undefined);
    this.resultados = [];
    this.listaLesiones = [];
  }
  switch (id) {
    case 1:
      this.obtenerSiguienteId();
      this.establecerValoresPestania(nombre, false, false, true, false, 'idNombre');
      break;
    case 2:
      this.mostrarFotoCliente(this.idFoto);
      this.establecerValoresPestania(nombre, true, true, false, true, 'idAutocompletado');
      this.muestraImagenPc=false;
      break;
    case 3:
      this.mostrarFotoCliente(this.idFoto);
      this.establecerValoresPestania(nombre, true, false, true, false, 'idAutocompletado');
      this.muestraImagenPc=false;
      break;
    case 4:
      this.mostrarFotoCliente(this.idFoto);
      this.establecerValoresPestania(nombre, true, true, true, true, 'idAutocompletado');
      this.muestraImagenPc=false;
      break;
    default:
      break;
  }
}
//Funcion para determina que accion se requiere (Agregar, Actualizar, Eliminar)
public accion(indice) {
  switch (indice) {
    case 1:
      this.agregar();
      break;
    case 3:
      this.actualizar();
      break;
    case 4:
      this.eliminar();
      break;
    default:
      break;
  }
}
//Obtiene el ID del modulo traido desde la base de datos y lo muestra en el campo id del formulario.
  private obtenerSiguienteId(){
    this.ejercicioService.obtenerSiguienteId().subscribe(
      res => {
        this.id.setValue(res.json());
      },
      err => {
        this.toastr.error("No se puede obtener el siguiente id");
      }
    );
  }
  // Carga en listaCompleta todos los registros de la DB
  private listar(){
    this.ejercicioService.listar().subscribe(
      res => {
        this.listaCompleta=res.json();
      },
      err => {
      }
    );
  }
  //Agrega un registro 
  private agregar(){    
    this.imagenService.postFileImagen(this.archivo).subscribe(res=>{
      var respuesta = res.json();
      var id= respuesta.id-1; //al id devuelto en la respuesta se le debe restar 1 para obtener el correcto id de la imagen
      let foto = { 
        id: id
      }
      this.formulario.get('idImagen').setValue(id);
      //obtiene el array de autorizados agregados y los guarda en el campo 'autorizados' del formulario
      this.formulario.get('idLesiones').setValue(this.listaLesionesAgregadasId);
      console.log( this.formulario.value);
      this.ejercicioService.agregar(this.formulario.value).subscribe(
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
    });
  }
  //Actualiza un registro
  private actualizar(){
    //obtiene el array de autorizados agregados y los guarda en el campo 'autorizados' del formulario
    if(this.bandera== true){
      this.imagenService.postFileImagen(this.archivo).subscribe(res=>{
        var respuesta = res.json();
        var id= respuesta.id-1; //al id devuelto en la respuesta se le debe restar 1 para obtener el correcto id de la imagen
        let foto = { 
          id: id
        }
        this.formulario.get('idImagen').setValue(foto.id);
        this.ejercicioService.actualizar(this.formulario.value).subscribe(
          res => {
            var respuesta = res.json();
            if(respuesta.codigo == 200) {
              this.reestablecerFormulario(undefined);
              setTimeout(function() {
                document.getElementById('idAutocompletado').focus();
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
      }
      );
    }
    else{
      this.formulario.get('idImagen').setValue(this.fotoCliente);
      this.formulario.get('idLesiones').setValue(this.listaLesionesAgregadas);
        this.ejercicioService.actualizar(this.formulario.value).subscribe(
          res => {
            var respuesta = res.json();
            if(respuesta.codigo == 200) {
              this.reestablecerFormulario(undefined);
              setTimeout(function() {
                document.getElementById('idAutocompletado').focus();
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
    }
  }
  //Elimina un registro
  private eliminar(){
    this.ejercicioService.eliminar(this.formulario.get('id').value).subscribe(
      res => {
        var respuesta = res.json();
        if(respuesta.codigo == 200) {
          this.reestablecerFormulario(undefined);
          setTimeout(function() {
            document.getElementById('idAutocompletado').focus();
          }, 20);
          this.toastr.success(respuesta.mensaje);
        }
      },
      err => {
        var respuesta = err.json();
        if(respuesta.codigo == 11002) {
          document.getElementById("labelNombre").classList.add('label-error');
          document.getElementById("idNombre").classList.add('is-invalid');
          document.getElementById("idAutocompletado").focus();
          this.toastr.error(respuesta.mensaje);
        }
      }
    );
    // this.imagenService.eliminar(this.formulario.get('idImagen'))
  }
  // Carga en el select Roles
  private listarGruposGenerales(){
    this.grupoGeneralService.listar().subscribe(
      res => {
        this.listaGrupoGenerales=res.json();
      },
      err => {
        this.toastr.error("No existen Grupos Generales agregados");
      }
    );
  }
  private listarGruposMusculares(){
    this.grupoMuscularService.listar().subscribe(
      res => {
        this.listaGrupoMusculares=res.json();
      },
      err => {
        this.toastr.error("No existen Grupos Musculares agregados");
      }
    );
  }
  private listarGruposMaquinas(){
    this.grupoMaquinaService.listar().subscribe(
      res => {
        this.listaGrupoMaquinas=res.json();
      },
      err => {
        this.toastr.error("No existen Grupos Maquinas agregados");
      }
    );
  }
  //Define el mostrado de datos y comparacion en campo select
  public compareFn = this.compararFn.bind(this);
  private compararFn(a, b) {
    if(a != null && b != null) {
      return a.id === b.id;
    }
  }
  // añade un autorizado seleccionado a la lista
  public addLesiones(lesion) {
    this.lesionElegida.push(lesion.id);
    this.listaLesionesAgregadas.push(lesion);// formato para mostrar en tabla las lesiones elegidas
    this.listaLesionesAgregadasId.push(lesion.id);// formato que me pide la Api para agregar un ejercicio
    this.lesiones.setValue(null);//seteo autocompletado a null
  }
  // elimina un autorizado seleccionado de la lista
  public deleteLesion(lesion) {
      for(let i=0; i< this.listaLesionesAgregadas.length; i++ ){
          if(lesion==this.listaLesionesAgregadas[i]){
            this.listaLesionesAgregadas.splice(i, 1);
            this.listaLesionesAgregadasId.splice(i,1);
            this.lesionElegida.splice(i,1);
        }
    }
  }
  //metodo cargar imagen
  public cargandoImagen(files: FileList, e){
    this.archivo=null;
    this.archivo=files[0];
    this.muestraImagenPc=false;

    var reader = new FileReader();
    reader.onload = this.fileOnload;
    reader.readAsDataURL(this.archivo);

    console.log('imagen adjuntada');
    this.bandera=true;
  }
  private fileOnload(e){
    var result=e.target.result;
    $('#imgSalida').attr("src",result);
    $('#imagen-nombre').empty().append('Foto cargada');
  }
  //mostrar Foto del Cliente en pestaña Actualizar, Consulat y Eliminar
  public mostrarFotoCliente(elemento){
    console.log("datos de la foto "+elemento);
    // if(elemento.imagen.id!= null){
    //   this.idFoto=elemento.imagen.id;
    //   this.fotoCliente=elemento.imagen;
    // }else
    // {
    //   this.idFoto=1;
    // }
  }
  //lista en la tabla todas las lesiones seleccionadas
  public listarLesiones(elemento){
    // for(let i=0;i<elemento.lesiones.length; i++){
    //   this.listaLesionesAgregadas.push(elemento.lesiones[i]);
    // }
  }
  //borro todo lo que tenga cargada la lista de Lesiones seleccionadas
  public borrarAgregados(){
    this.listaLesionesAgregadas.splice(0, this.listaLesionesAgregadas.length);
  }
  //Reestablece los campos formularios
  private reestablecerFormulario(id) {
    this.formulario.reset();
    this.autocompletado.setValue(undefined);
    this.lesiones.setValue(undefined);
    this.resultados = [];
    this.listaLesiones = [];
    this.borrarAgregados();
    this.muestraImagenPc=true;
    this.obtenerSiguienteId();
    this.listar();
  }
  //Manejo de colores de campos y labels
  public cambioCampo(id, label) {
    document.getElementById(id).classList.remove('is-invalid');
    document.getElementById(label).classList.remove('label-error');
  };
  //Muestra en la pestania buscar el elemento seleccionado de listar
  public activarConsultar(elemento) {
    console.log(elemento);
    this.seleccionarPestania(2, this.pestanias[1].pestania.nombre, 1);
    this.autocompletado.setValue(elemento);
    this.formulario.patchValue(elemento);
    this.id.setValue(elemento.id);
    //borro todo lo que tenga cargada la lista
    this.borrarAgregados();
    //agrego los autorizados del Cliente seleccionado
    this.listarLesiones(elemento);
    this.mostrarFotoCliente(elemento);
    this.muestraImagenPc=false;
  }
  //Muestra en la pestania actualizar el elemento seleccionado de listar
  public activarActualizar(elemento) {
    this.seleccionarPestania(3, this.pestanias[2].pestania.nombre, 1);
    this.autocompletado.setValue(elemento);
    this.formulario.patchValue(elemento);
    this.id.setValue(elemento.id);
    this.borrarAgregados();
    this.listarLesiones(elemento);
    this.mostrarFotoCliente(elemento);
    this.muestraImagenPc=false;

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
}
