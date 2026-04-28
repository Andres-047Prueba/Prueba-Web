import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio }     from './datos.service';

@Component({
  selector  : 'app-tarjeta',
  standalone: true,
  imports   : [CommonModule],
  template  : `
    <div class="tarjeta">

      <!--
        [style.background-color]: Property Binding.
        Asigna el color de fondo dinámicamente desde servicio.colorFondo.
      -->
      <div class="tarjeta__imagen"
           [style.background-color]="servicio.colorFondo">
        {{ icono(servicio.categoria) }}
      </div>

      <div class="tarjeta__cuerpo">
        <!-- Interpolación {{ }}: muestra el valor de la propiedad -->
        <span class="tarjeta__categoria">{{ servicio.categoria }}</span>
        <h3  class="tarjeta__nombre">{{ servicio.nombre }}</h3>
        <p   class="tarjeta__descripcion">{{ servicio.descripcion }}</p>
      </div>

      <div class="tarjeta__pie">
        <!--
          [href]: Property Binding — construye la URL con el id.
          (click): Event Binding — llama a verDetalle() al hacer clic
          y emite el evento hacia el componente padre.
        -->
        <a [href]="'detalle.html?id=' + servicio.id"
           class="btn btn--primario btn--bloque">
          Ver Detalle &rarr;
        </a>
      </div>
    </div>
  `
})
export class TarjetaComponent {

  @Input() servicio!: Servicio;

  @Output() verDetalleClick = new EventEmitter<number>();

  verDetalle(): void {
    this.verDetalleClick.emit(this.servicio.id);
  }

  icono(categoria: string): string {
    const mapa: { [k: string]: string } = {
      'Educación': '📚', 'Tecnología': '💻',
      'Turismo':   '🗺️', 'Comercio':   '🛒'
    };
    return mapa[categoria] || '⭐';
  }
}
