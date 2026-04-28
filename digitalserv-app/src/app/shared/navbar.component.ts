// ============================================================
// navbar.component.ts  —  Componente reutilizable del navbar
//
// CONCEPTOS ANGULAR:
//   standalone: true  → no necesita NgModule, se importa directo
//   @Input()          → propiedad que recibe el componente padre
//   *ngFor            → repite <li> por cada enlace del arreglo
//   [class.activo]    → agrega la clase CSS solo si la condición es true
// ============================================================
import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';

@Component({
  selector  : 'app-navbar',
  standalone: true,
  imports   : [CommonModule],
  template  : `
    <nav class="navbar">
      <a href="index.html" class="navbar__logo">Digital<span>Serv</span></a>

      <!-- *ngFor genera un <li> por cada objeto del arreglo "enlaces" -->
      <ul class="navbar__menu">
        <li *ngFor="let enlace of enlaces">
          <!--
            [class.activo]: Property Binding condicional.
            Agrega la clase "activo" solo cuando la ruta coincide
            con la página que el padre indicó en [paginaActual].
          -->
          <a [href]="enlace.ruta"
             [class.activo]="enlace.ruta === paginaActual">
            {{ enlace.texto }}
          </a>
        </li>
      </ul>
    </nav>
  `
})
export class NavbarComponent {
  /*
    @Input(): permite recibir datos del componente padre.
    Uso: <app-navbar [paginaActual]="'servicios.html'"></app-navbar>
    Esto es Property Binding (unidireccional: padre → hijo).
  */
  @Input() paginaActual: string = 'index.html';

  // Arreglo que *ngFor itera para generar los links
  enlaces = [
    { texto: 'Inicio',     ruta: 'index.html'     },
    { texto: 'Servicios',  ruta: 'servicios.html'  },
    { texto: 'Mis Clases', ruta: 'mis-clases.html' },
    { texto: 'Favoritos',  ruta: 'favoritos.html'  },
    { texto: 'Contacto',   ruta: 'contacto.html'   },
    { texto: 'Admin',      ruta: 'admin.html'      },
  ];
}
