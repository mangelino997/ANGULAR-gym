import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class FechaService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/fecha';
    const cabecera: Headers = new Headers();
    cabecera.append('Content-Type', 'application/json');
    this.opciones= new RequestOptions({
      headers: cabecera
    });
  }
  //obtiene fecha actual
  public obtenerFecha() {
    return this.http.get(this.url + '/obtenerFecha');
  }
  //obtiene la lista de hasta 5 años en adelante
  public listarCincoAnios() {
    return this.http.get(this.url+'/listarCincoAnios');
  }
}
