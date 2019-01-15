import { Component, OnInit } from '@angular/core';
import { ModuloService } from 'src/app/servicios/modulo.service';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {
  //Define el menu
  public menu: Array<any> = [];
  constructor(private moduloServicio: ModuloService) { 
    this.listarMenu();
  }
  ngOnInit() {
  }
  //Obtiene la lista de modulos para armar el menu
  public listarMenu() {
    this.moduloServicio.listarMenu(1).subscribe(
      res => {
        this.menu = res.json();
      },
      err => {
        console.log(err);
      }
    );  
  }
}
