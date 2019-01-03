import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class SocioService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/socio';
    const cabecera: Headers = new Headers();
    cabecera.append('Content-Type', 'application/json');
    this.opciones= new RequestOptions({
      headers: cabecera
    });
  }
  //obtiene el siguiente Id
  public obtenerSiguienteId() {
    return this.http.get(this.url + '/obtenerSiguienteId');
  }
  //obtiene un listado por nombre
  public listarPorNombre(nombre) {
    return this.http.get(this.url + '/listarPorNombre/'+nombre);
  }
  //obtiene un listado por nombre
  public listarPorAlias(alias) {
    return this.http.get(this.url + '/listarPorAlias/'+alias);
  }
  //obtiene un listado por nombre
  public obtenerPorDNI(dni) {
    return this.http.get(this.url + '/obtenerPorDNI/'+dni);
  }
  //obtiene un listado por nombre
  public obtenerImporteYEsDeudor(e) {
    return this.http.get(this.url + '/obtenerImporteYEsDeudor/'+e);
  }
  //obtiene un listado por nombre
  public esDeudor(e) {
    return this.http.get(this.url + '/esDeudor/'+e);
  }
  //obtiene un listado por nombre
  public listarPorActividad(actividad) {
    return this.http.get(this.url + '/listarPorActividad/'+actividad);
  }
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
  }
  //obtiene la lista completa de registros
  public listarVencidosHoy() {
    return this.http.get(this.url + '/listarVencidosHoy');
  }
  //obtiene la lista completa de registros
  public listarVencidosManana() {
    return this.http.get(this.url + '/listarVencidosManana');
  }
  //obtiene la lista completa de registros
  public listarTodosVencidos() {
    return this.http.get(this.url + '/listarTodosVencidos');
  }
  //obtiene la lista completa de registros
  public listarCumpleanieros() {
    return this.http.get(this.url + '/listarCumpleanieros');
  }
  //agrega un registro
  public agregar(elemento) {
    return this.http.post(this.url, elemento);
  }
  //actualiza un registro
  public actualizar(elemento) {
    return this.http.put(this.url, elemento);
  }
  //eliminar un registro
  public eliminar(idRegistro) {
    return this.http.delete(this.url, idRegistro);
  }
}