import { Component, OnInit } from '@angular/core';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {
  //Define el menu
  public menu: Array<any> = [];
  constructor(private moduloServicio: ModuloService, private router: Router,
    private appComponente: AppComponent) { 
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
  //Define la navegación en el menu
  public navegar(modulo, subopcion) {
    this.appComponente.setSubopcion(subopcion.id);
    var pag = modulo.modulo + subopcion.subopcion;
    var pagina = pag.toLowerCase();
    pagina = pagina.replace(new RegExp(/\s/g), "");
    pagina = pagina.replace(new RegExp(/[àá]/g), "a");
    pagina = pagina.replace(new RegExp(/[èé]/g), "e");
    pagina = pagina.replace(new RegExp(/[ìí]/g), "i");
    pagina = pagina.replace(new RegExp(/ñ/g), "n");
    pagina = pagina.replace(new RegExp(/[òó]/g), "o");
    pagina = pagina.replace(new RegExp(/[ùú]/g), "u");
    pagina = pagina.replace(new RegExp(/ /g), "");
    pagina = pagina.replace(new RegExp(/[-]/g), "");
    pagina = pagina.replace(new RegExp(/[,]/g), "");
    pagina = pagina.replace(new RegExp(/[.]/g), "");
    pagina = pagina.replace(new RegExp(/[/]/g), "");
    console.log(pagina);
    this.router.navigate([pagina]);
  }
}
