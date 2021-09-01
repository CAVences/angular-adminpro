import { Component, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
  

  public labels1: string[] = ['Panochon', 'Queso babas', 'Queso badones'];
  public data1 = [
    [5, 45, 10],
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
