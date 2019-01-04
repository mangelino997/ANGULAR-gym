import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { SubopcionPestaniaService } from 'src/app/servicios/subopcion-pestania.service';
import { ToastrService } from 'ngx-toastr';
import { PestaniaService } from 'src/app/servicios/pestania.service';
import { Pestania } from 'src/app/modelos/pestania';
import { Socio } from 'src/app/modelos/socio';
import { SocioService } from 'src/app/servicios/socio.service';
import { Foto } from 'src/app/modelos/foto';
import { FotoService } from 'src/app/servicios/foto.service';
@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.scss']
})

export class SocioComponent implements OnInit {

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

  bandera: boolean= false;


  
  //declaramos en el constructor las clases de las cuales usaremos sus servicios/metodos
  constructor(  private socioService: SocioService, private foto:Foto, private fotoService: FotoService ,private socio: Socio  ,private subopcionPestaniaServicio: SubopcionPestaniaService, private toastr: ToastrService) {
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.socioService.listarPorAlias(data).subscribe(res => {
          this.resultados = res.json();
        })
      }
    });
   }

  ngOnInit() {
    //inicializa el formulario y sus elementos
    this.formulario= this.socio.formulario;
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
    //Obtiene la lista completa de registros (los muestra en la pestaña Listar)
    this.listar();
    // inicializa en false
    this.muestraImagenPc=true;
  }

  //Establece el formulario al seleccionar elemento del autocompletado
  public cambioAutocompletado(elemento) {
    this.formulario.patchValue(elemento);
    this.mostrarFotoCliente(elemento);
    this.muestraImagenPc=false;
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
    setTimeout(function () {
      document.getElementById(componente).focus();
    }, 20);
  };
  //Establece valores al seleccionar una pestania
  public seleccionarPestania(id, nombre, opcion) {
    this.formulario.reset();
    this.indiceSeleccionado = id;
    this.activeLink = nombre;
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
      this.establecerValoresPestania(nombre, false, false, true, 'idNombre');
      break;
    case 2:
      this.mostrarFotoCliente(this.idFoto);
      this.establecerValoresPestania(nombre, true, true, false, 'idAutocompletado');
      this.formulario.get('esVip').disable();
      this.muestraImagenPc=false;
      break;
    case 3:
      this.mostrarFotoCliente(this.idFoto);
      this.establecerValoresPestania(nombre, true, false, true, 'idAutocompletado');
      this.muestraImagenPc=false;
      break;
    case 4:
      this.mostrarFotoCliente(this.idFoto);
      this.establecerValoresPestania(nombre, true, true, true, 'idAutocompletado');
      this.muestraImagenPc=false;
      this.formulario.get('esVip').disable();
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
    this.socioService.obtenerSiguienteId().subscribe(
      res => {
        console.log(res);
        this.formulario.get('id').setValue(res.json());
      },
      err => {
        console.log(err);
      }
    );
  }
  // Carga en listaCompleta todos los registros de la DB
  private listar(){
    this.socioService.listar().subscribe(
      res => {
        this.listaCompleta=res.json();
      },
      err => {
        console.log(err);
      }
    );
  }
  //Pasa el foco a cargar foto al apretar tab en "nuevo autorizado"
  public focoImagen(e) { 
    setTimeout(function () {
      document.getElementById('file-input').focus();
    }, 20);
  }

  //Pasa el foco a la tabla de autorizados agregados
  public focoBtnAgregar() { 
    console.log("tabb");
    document.getElementById("idBoton").focus();
    setTimeout(function () {
      document.getElementById("idBoton").focus();
    }, 20);
  }
  //Agrega un registro 
  private agregar(){    
    this.fotoService.postFileImagen(this.archivo).subscribe(res=>{
      var respuesta = res.json();
      var id= respuesta.id-1; //al id devuelto en la respuesta se le debe restar 1 para obtener el correcto id de la imagen
      let foto = { 
        id: id
      };
      let usuarioAlta = {
        id: 1
      };
      console.log(this.formulario.value);
      console.log(respuesta);
      this.formulario.get('foto').setValue(foto);
      this.formulario.get('usuarioAlta').setValue(usuarioAlta);
      this.formulario.get('estaActivo').setValue(true);
      console.log(this.formulario.value);
      this.socioService.agregar(this.formulario.value).subscribe(
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
    },
    err => {
      var respuesta = err.json();
      if(respuesta.codigo == 11002) {
        document.getElementById("imagen-nombre").classList.add('label-error');
        document.getElementById("file-input").classList.add('is-invalid');
        document.getElementById("file-input").focus();
        this.toastr.error("Debe cambiar el nombre de la Foto. Ese nombre ya existe!");
      }
    });
  }
  //Actualiza un registro
  private actualizar(){
    //obtiene el array de autorizados agregados y los guarda en el campo 'autorizados' del formulario
    if(this.bandera== true){
      this.fotoService.postFileImagen(this.archivo).subscribe(res=>{
        var respuesta = res.json();
        var id= respuesta.id-1; //al id devuelto en la respuesta se le debe restar 1 para obtener el correcto id de la imagen
        let foto = { 
          id: id
        };
        let usuarioAlta = {
          id: 1
        };
        console.log(this.formulario.value);
        console.log(respuesta);
        this.formulario.get('foto').setValue(foto);
        this.formulario.get('usuarioAlta').setValue(usuarioAlta);
        this.formulario.get('estaActivo').setValue(true);
        console.log(this.formulario.value);
        this.socioService.actualizar(this.formulario.value).subscribe(
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
      this.formulario.get('foto').setValue(this.fotoCliente);
        this.socioService.actualizar(this.formulario.value).subscribe(
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
    this.socioService.agregar(this.formulario.get('id').value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  //Define el nombre del usuario
  public cargarNombreUsuario(){
    var nombre=this.formulario.get('nombre').value;
    var codigo=this.formulario.get('id').value;
    this.formulario.get('nombreUsuario').setValue(nombre+codigo);
  }
  //Define la contraseña
  public cargarContrasenia(){
    this.formulario.get('contrasenia').setValue(this.formulario.get('dni').value);
  }
  //Define el mostrado de datos y comparacion en campo select
  public compareFn = this.compararFn.bind(this);
  private compararFn(a, b) {
    if(a != null && b != null) {
      return a.id === b.id;
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

    console.log(e);
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
    console.log(elemento.foto);
    if(elemento.foto!= null){
      this.idFoto=elemento.foto.id;
      this.fotoCliente=elemento.foto;
    }else
    {
      this.idFoto=1;
    }
  }
  //Reestablece los campos formularios
  private reestablecerFormulario(id) {
    this.formulario.reset();
    this.formulario.get('id').setValue(id);
    this.autocompletado.setValue(undefined);
    this.lesiones.setValue(undefined);
    this.resultados = [];
    this.muestraImagenPc=true;
    this.formularioFoto.reset();
    this.formularioFoto.get('foto').setValue(null);
    this.formulario.get('foto').setValue(null);
    this.listar();
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
    this.mostrarFotoCliente(elemento);
    this.muestraImagenPc=false;
  }
  //Muestra en la pestania actualizar el elemento seleccionado de listar
  public activarActualizar(elemento) {
    this.seleccionarPestania(3, this.pestanias[2].pestania.nombre, 1);
    this.autocompletado.setValue(elemento);
    this.formulario.patchValue(elemento);
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
