import { Component, OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  //Define la posicion del tooltip
  positionOptions: TooltipPosition[] = ['right'];
  position = new FormControl(this.positionOptions[0]);
  //Establece el sidenav como abierto por defecto
  public opened:boolean = true;
  //Constructor
  constructor() {}
  //Al inicializar el componente
  ngOnInit() {
    
  }
}
