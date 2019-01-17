import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocioService } from 'src/app/servicios/socio.service';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-vencidos',
  templateUrl: './vencidos.component.html',
  styleUrls: ['./vencidos.component.scss']
})
export class VencidosComponent implements OnInit {
  //Define la lista completa de registros
  public list:Array<any> = [];
  //Define la ip 
  public ip: any;
  //id de la foto del cliente para mostrarla en Consultar, Actualizar y Eliminar
  public idFoto: number=null;

  constructor(private toastr: ToastrService, private socioService: SocioService, private appService: AppService) {

  }

  ngOnInit() {
    // Listar los vencidos mañana
    this.listExpired();
    // Seteamos la Ip global
    this.ip= this.appService.URL_BASE;
  }
  public listExpired(){
    this.socioService.listarTodosVencidos().subscribe(data => {
          this.list = data.json();
    })
  }
  // Elimina un vencido
  public eliminateExpired(id){
  
  }
}
