import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { DatosService, Servicio } from '../shared/datos.service';
import { NavbarComponent }   from '../shared/navbar.component';

@Component({
  selector  : 'app-mis-clases',
  standalone: true,
  imports   : [CommonModule, NavbarComponent],
  template  : `
    <app-navbar [paginaActual]="'mis-clases.html'"></app-navbar>

    <div class="encabezado-pagina">
      <h1>📚 Mis Clases</h1>
      <!-- Interpolación: muestra el total actualizado automáticamente -->
      <p>{{ clases.length }} clase(s) inscrita(s)</p>
    </div>

    <section class="seccion">

      <!-- Resumen: visible solo si hay clases inscritas -->
      <div class="resumen" *ngIf="clases.length > 0">
        <div class="resumen__item">
          <div class="resumen__icono">📋</div>
          <div>
            <div class="resumen__valor">{{ clases.length }}</div>
            <div class="resumen__etiqueta">Clases inscritas</div>
          </div>
        </div>
        <div class="resumen__item">
          <div class="resumen__icono">🏷️</div>
          <div>
            <div class="resumen__valor">{{ totalCategorias }}</div>
            <div class="resumen__etiqueta">Categorías distintas</div>
          </div>
        </div>
        <div class="resumen__item">
          <div class="resumen__icono">💰</div>
          <div>
            <div class="resumen__valor">{{ '$' + precioTotal }}</div>
            <div class="resumen__etiqueta">Inversión total (COP)</div>
          </div>
        </div>
      </div>

      <!-- *ngFor genera una card por cada clase inscrita -->
      <div id="lista-clases">
        <div class="clase-card" *ngFor="let s of clases">

          <!--
            [style.background-color]: Property Binding de estilo.
            Asigna el color dinámicamente desde el objeto.
          -->
          <div class="clase-card__icono"
               [style.background-color]="s.colorFondo">
            {{ icono(s.categoria) }}
          </div>

          <div class="clase-card__info">
            <span class="clase-card__categoria">{{ s.categoria }}</span>
            <h3  class="clase-card__nombre">{{ s.nombre }}</h3>
            <p   class="clase-card__desc">{{ s.descripcion }}</p>
            <div class="clase-card__detalles">
              <span>📅 {{ s.duracion }}</span>
              <span>👨‍🏫 {{ s.instructor }}</span>
              <span>🎓 {{ s.nivel }}</span>
            </div>
          </div>

          <div class="clase-card__lateral">
            <span class="badge-inscrito">✅ Inscrito</span>
            <div class="clase-card__precio-valor">{{ s.precio }}</div>
            <div style="display:flex;gap:10px;">
              <a [href]="'detalle.html?id=' + s.id" class="btn btn--primario">
                Ver detalle
              </a>
              <!-- (click): Event Binding — llama a cancelar() con el id -->
              <button class="btn btn--acento" (click)="cancelar(s.id)">
                Cancelar
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Estado vacío: *ngIf lo muestra solo si no hay clases -->
      <div class="estado-vacio" *ngIf="clases.length === 0">
        <p>📖 Aún no te has inscrito en ninguna clase.</p>
        <a href="servicios.html" class="btn btn--primario">→ Explorar Catálogo</a>
      </div>

    </section>

    <footer><p>&copy; 2024 DigitalServ &nbsp;|&nbsp; Todos los derechos reservados</p></footer>
  `
})
export class MisClasesComponent implements OnInit {

  clases         : Servicio[] = [];
  totalCategorias: number     = 0;
  precioTotal    : string     = '0';

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.clases = this.datosService.obtenerClasesInscritas();
    const cats  = new Set(this.clases.map(c => c.categoria));
    this.totalCategorias = cats.size;
    let suma = 0;
    this.clases.forEach(c => {
      const n = parseInt(c.precio.replace(/[^0-9]/g, ''));
      if (!isNaN(n)) suma += n;
    });
    this.precioTotal = suma.toLocaleString('es-CO');
  }

  cancelar(id: number): void {
    if (confirm('¿Cancelar tu inscripción en esta clase?')) {
      this.datosService.cancelarInscripcion(id);
      this.cargar(); 
    }
  }

  icono(categoria: string): string {
    const mapa: { [k: string]: string } = {
      'Educación': '📚', 'Tecnología': '💻',
      'Turismo':   '🗺️', 'Comercio':   '🛒'
    };
    return mapa[categoria] || '⭐';
  }
}
