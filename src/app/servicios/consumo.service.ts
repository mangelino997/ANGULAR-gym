import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Http } from '@angular/http';

//Define operaciones contra el servicio web.
@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  //constructor
  constructor(private appService: AppService, private http: Http) {
    
  }
}
