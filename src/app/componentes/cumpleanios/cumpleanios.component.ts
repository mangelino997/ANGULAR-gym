import { Component, OnInit } from '@angular/core';
import { SocioService } from 'src/app/servicios/socio.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/servicios/app.service';

@Component({
  selector: 'app-cumpleanios',
  templateUrl: './cumpleanios.component.html',
  styleUrls: ['./cumpleanios.component.scss']
})
export class CumpleaniosComponent implements OnInit {
  //Define la lista completa de registros
  public list:Array<any> = [];
  //Define la ip 
  public ip: any;

  constructor(private toastr: ToastrService, private socioService: SocioService, private appService: AppService) {

   }

  ngOnInit() {
    //Obtenemos todos los cumpleañeros
    this.listBirthday();
    // seteamos la Ip global
    this.ip= this.appService.URL_BASE;
  }
  public listBirthday(){
    this.socioService.listarCumpleanieros().subscribe(data => {
          this.list = data.json();
          console.log(this.list.length);
    })
  }

}
