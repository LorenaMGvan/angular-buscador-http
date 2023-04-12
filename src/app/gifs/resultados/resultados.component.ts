import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  get resultadosX() {
    return this.gifServicio.resultados;
  }

  constructor(private gifServicio: GifsService) {

  }
}
