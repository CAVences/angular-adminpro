import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medicos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService ) { }


  busquedaGlobal( termino: string ) {
    this.busquedasService.busquedaGlobal( termino ).subscribe( (response: any) => {
      console.log(response)
      this.usuarios = response.usuarios;
      this.medicos = response.medicos;
      this.hospitales = response.hospitales;
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino}) => this.busquedaGlobal(termino))
  }

}
