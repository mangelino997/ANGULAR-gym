import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions  } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  //define la url contra el servicio web
  private url: string;
  private opciones: any;
  //constructor
  constructor(private appService: AppService, private http: Http) {
    this.url = appService.getUrlBase() + '/consumo';
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
  //obtiene la lista completa de registros
  public listar() {
    return this.http.get(this.url);
  }
  //obtiene un listado por socio
  public listarPorSocio(socio) {
    return this.http.get(this.url + '/listarPorSocio/'+socio);
  }
  //obtiene un listado por fecha
  public listarPorFecha(fecha) {
    return this.http.get(this.url + '/listarPorFecha/'+fecha);
  }
  //obtiene un listado por mes y anio
  public listarPorMesAnio(mes, anio) {
    return this.http.get(this.url + '/listarPorMesAnio/'+mes+'/'+anio);
  }
  //obtiene un listado por anio
  public listarPorAnio(anio) {
    return this.http.get(this.url + '/listarPorMesAnio/'+anio);
  }
  //obtiene un listado por periodo
  public listarPorPeriodo(inicio, fin) {
    return this.http.get(this.url + '/listarPorPeriodo/'+inicio+'/'+fin);
  }
  //obtiene un listado mensual por anio
  public listarImporteMensualPorAnio(anio) {
    return this.http.get(this.url + '/listarImporteMensualPorAnio/'+anio);
  }
  //obtiene un listado de importe anual por anio
  public listarImporteAnualPorAnios(anio) {
    return this.http.get(this.url + '/listarImporteAnualPorAnios/'+anio);
  }
  //obtiene un importe por mes 
  public obtenerImportePorMes(mes, anio) {
    return this.http.get(this.url + '/obtenerImportePorMes/'+mes+'/'+anio);
  }
  //obtiene deudas por socio 
  public obtenerDeudaPorSocio(socio) {
    return this.http.get(this.url + '/obtenerDeudaPorSocio/'+socio);
  }
  //obtiene una lista de deudas por socio 
  public listarDeudasPorSocio(socio) {
    return this.http.get(this.url + '/listarDeudasPorSocio/'+socio);
  }
  //obtiene una lista de deudas por socio 
  public listarDeudasPorSocioYFecha(socio, fecha) {
    return this.http.get(this.url + '/listarDeudasPorSocioYFecha/'+socio+'/'+fecha);
  }
  //obtiene una lista de deudas por socio 
  public listarPagosPorConsumo(consumo) {
    return this.http.get(this.url + '/listarPagosPorConsumo/'+consumo);
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
    return this.http.delete(this.url+'/'+ idRegistro);
  }
}
