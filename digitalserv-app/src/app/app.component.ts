import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ServiciosComponent }  from './servicios/servicios.component';
import { MisClasesComponent }  from './mis-clases/mis-clases.component';

@Component({
  selector  : 'app-root',
  standalone: true,
  imports   : [CommonModule, ServiciosComponent, MisClasesComponent],
  template  : `
    <app-servicios  *ngIf="pagina === 'servicios'"></app-servicios>
    <app-mis-clases *ngIf="pagina === 'mis-clases'"></app-mis-clases>
  `
})
export class AppComponent implements OnInit {
  pagina: string = '';
  ngOnInit(): void {
    const ruta = window.location.pathname;
    if      (ruta.includes('mis-clases'))  this.pagina = 'mis-clases';
    else if (ruta.includes('servicios'))   this.pagina = 'servicios';
  }
}
