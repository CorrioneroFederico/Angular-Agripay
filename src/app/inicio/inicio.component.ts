import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  title:string='Bienvenido';

  constructor() { }

  ngOnInit(): void {
  }

}
