
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class VentaService {
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
  //obtiene un listado por mes y año
  public listarPorMesAnio(mes, anio) {
    return this.http.get(this.url + '/listarPorMesAnio/'+mes+'/'+anio);
  }
  //obtiene un listado por año
  public listarPorAnio(anio) {
    return this.http.get(this.url + '/listarPorAnio/'+anio);
  }
  //obtiene un listado por periodo
  public listarPorPeriodo(periodo1, periodo2) {
    return this.http.get(this.url + '/listarPorPeriodo/'+periodo1+'/'+periodo2);
  }
  //obtiene un importe por mes
  public obtenerImportePorMes(mes) {
    return this.http.get(this.url + '/obtenerImportePorMes/'+mes);
  }
  //obtiene un listado de importe mensual por año
  public listarImporteMensualPorAnio(anio) {
    return this.http.get(this.url + '/listarImporteMensualPorAnio/'+anio);
  }
  //obtiene un listado de importe anual por años
  public listarImporteAnualPorAnios(anios) {
    return this.http.get(this.url + '/listarImporteAnualPorAnios/'+anios);
  }
  //obtiene lista de deudas por socio
  public obtenerDeudaPorSocio(idSocio) {
    return this.http.get(this.url + '/obtenerDeudaPorSocio/'+idSocio);
  }
  //obtiene un listado de deudas por socio
  public listarDeudasPorSocio(idSocio) {
    return this.http.get(this.url + '/listarDeudasPorSocio/'+idSocio);
  }
  //obtiene un listado de deudas por socio y fecha
  public listarDeudasPorSocioYFecha(idSocio, fecha) {
    return this.http.get(this.url + '/listarDeudasPorSocioYFecha/'+idSocio+'/'+fecha);
  }
  //obtiene un listado de pagos por consumo
  public listarPagosPorConsumo(idConsumo) {
    return this.http.get(this.url + '/listarPagosPorConsumo/'+idConsumo);
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