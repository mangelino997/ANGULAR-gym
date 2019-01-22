import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //Define la visibilidad del sistema en el login
  public visible:boolean = false;
  //Define el usuario
  public usuario: any;
  //Define el menu
  public menu: Array<any>;
  //Define la subopcion
  public subopcion: any;
  //Constructor
  constructor() {}
  //Establece la visibilidad del sistema en el login
  public setVisible(valor) {
    this.visible = valor;
  }
  //Obtiene el usuario logueado
  public getUsuario(){
    return this.usuario;
  }
  //Establece el usuario logueado
  public setUsuario(usuario){
    this.usuario = usuario;
  }
  //Obtiene la subopcion
  public getSubopcion() {
    return this.subopcion;
  }
  //Establece la subopcion
  public setSubopcion(subopcion) {
    this.subopcion = subopcion;
  }
}
