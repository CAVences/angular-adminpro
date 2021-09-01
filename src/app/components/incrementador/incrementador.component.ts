import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {


  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary'

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progreso}%`
  }

  cambiarValor(valor: number): number | void {

    if(this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso)
  }

  onChange(numeroValor: number) {
    if(numeroValor >= 100) {
      this.progreso = 100;
    } else if ( numeroValor <= 0) {
      this.progreso = 0
    } else {
      this.progreso = numeroValor;
    }

    this.valorSalida.emit(this.progreso)
  }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }
}
