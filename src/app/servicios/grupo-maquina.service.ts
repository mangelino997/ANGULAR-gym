import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class GrupoMaquinaService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http, private httpClient: HttpClient) {
    this.url = appService.getUrlBase() + '/grupoMaquina';
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
 
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
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

