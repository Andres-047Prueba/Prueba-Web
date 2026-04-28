import { Component, OnInit }   from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';   
import { DatosService, Servicio } from '../shared/datos.service';
import { TarjetaComponent }    from '../shared/tarjeta.component';
import { NavbarComponent }     from '../shared/navbar.component';

@Component({
  selector  : 'app-servicios',
  standalone: true,
  imports   : [CommonModule, FormsModule, TarjetaComponent, NavbarComponent],
  template  : `
    <!-- Navbar con binding de página activa -->
    <app-navbar [paginaActual]="'servicios.html'"></app-navbar>

    <div class="encabezado-pagina">
      <h1>Catálogo de Servicios</h1>
      <p>Explora todos nuestros servicios disponibles</p>
    </div>

    <!-- Barra de filtros -->
    <div class="barra-filtros">

      <!--
        [(ngModel)] = Two-Way Binding:
        - Muestra el valor de "textoBusqueda" en el input
        - Actualiza "textoBusqueda" cuando el usuario escribe
        (ngModelChange) dispara filtrar() en cada pulsación de tecla.
      -->
      <input
        type="text"
        class="barra-filtros__busqueda"
        placeholder="🔍 Buscar servicio..."
        [(ngModel)]="textoBusqueda"
        (ngModelChange)="filtrar()"
      />

      <div class="barra-filtros__chips">
        <!--
          *ngFor genera un chip por cada categoría.
          [class.activo]: agrega la clase CSS cuando esa categoría está activa.
          (click): Event Binding — llama a seleccionar() con el nombre.
        -->
        <button
          *ngFor="let cat of categorias"
          class="chip"
          [class.activo]="categoriaActiva === cat"
          (click)="seleccionar(cat)">
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Grid de tarjetas -->
    <section class="seccion">
      <div class="grid-servicios">
        <!--
          *ngFor itera "serviciosFiltrados".
          <app-tarjeta> es el componente hijo.
          [servicio] es Property Binding: le pasa el objeto completo.
        -->
        <app-tarjeta
          *ngFor="let s of serviciosFiltrados"
          [servicio]="s">
        </app-tarjeta>
      </div>

      <!-- *ngIf muestra el mensaje solo cuando no hay resultados -->
      <div class="estado-vacio" *ngIf="serviciosFiltrados.length === 0">
        <p> No se encontraron servicios con ese criterio.</p>
        <button class="btn btn--contorno" (click)="limpiar()">Ver todos</button>
      </div>
    </section>

    <footer><p>&copy; 2024 DigitalServ &nbsp;|&nbsp; Todos los derechos reservados</p></footer>
  `
})
export class ServiciosComponent implements OnInit {

  textoBusqueda     : string     = '';
  categoriaActiva   : string     = 'Todos';
  serviciosFiltrados: Servicio[] = [];

  categorias = ['Todos', 'Educación', 'Tecnología', 'Turismo', 'Comercio'];

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    this.filtrar();
  }

  filtrar(): void {
    const todos = this.datosService.obtenerServicios();
    this.serviciosFiltrados = todos.filter(s => {
      const cat = this.categoriaActiva === 'Todos' || s.categoria === this.categoriaActiva;
      const txt = s.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
                  s.descripcion.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      return cat && txt;
    });
  }

  seleccionar(cat: string): void {
    this.categoriaActiva = cat;
    this.filtrar();
  }

  limpiar(): void {
    this.textoBusqueda   = '';
    this.categoriaActiva = 'Todos';
    this.filtrar();
  }
}
