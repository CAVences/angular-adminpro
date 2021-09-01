import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 25;
  progreso2: number = 35;

  get getPorcentaje1() {
    return `${this.progreso1}%`
  }

  get getPorcentaje2() {
    return `${this.progreso2}%`
  }

  cambioDeValor(valor: number) {
    this.progreso1 = valor;
  }

  cambioDeValor2(valor: number) {
    this.progreso2 = valor;
  }
}
