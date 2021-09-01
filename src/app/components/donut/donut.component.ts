import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {

  @Input() title: string = 'Sin titulo';


  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  public colors: Color [] = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }
  ]


  constructor() { }

  ngOnInit(): void {

  }

}
