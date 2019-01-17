import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocioService } from 'src/app/servicios/socio.service';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-vence-maniana',
  templateUrl: './vence-maniana.component.html',
  styleUrls: ['./vence-maniana.component.scss']
})
export class VenceManianaComponent implements OnInit {
//Define la lista completa de registros
public listaCompleta:Array<any> = [];
//Define la ip 
public ip: any;
//id de la foto del cliente para mostrarla en Consultar, Actualizar y Eliminar
public idFoto: number=null;

constructor(private toastr: ToastrService, private socioService: SocioService, private appService: AppService) {

 }

ngOnInit() {
  this.socioService.listarVencidosManana().subscribe(data => {
    if(typeof data == 'string') {
      this.socioService.listarPorAlias(data).subscribe(response =>{
        this.listaCompleta = response.json();
        console.log(this.listaCompleta);
      })
    }
  });
  // seteamos la Ip global
  this.ip= this.appService.URL_BASE;
}

}
