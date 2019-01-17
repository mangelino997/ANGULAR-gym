import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //Define la url base del servicio web
  public URL_BASE: string = 'http://192.168.0.32:8082/lesionws/auth'; //192.168.0.99//192.168.0.32
  //Constructor
  constructor() {}
  //Obtiene la url base
  public getUrlBase(): string {
    return this.URL_BASE;
  }
}
