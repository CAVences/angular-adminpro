import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medicos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs!: Subscription;

  constructor( private medicoService: MedicoService,
               private modalService: ModalImagenService,
               private busquedaService: BusquedasService ) { }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe( response => {
      this.cargando = false;
      this.medicos = response!;
      console.log(this.medicos)
    })
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Estas a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.medicoService.borrarMedico(medico._id!).subscribe(response => {
          this.cargarMedicos();
          Swal.fire('Medico eliminado', `${medico.nombre} fue eliminado exitosamente`, 'success')
        }, (error) => {
          Swal.fire('Error', error.error.message, 'error')
        })

      }
    })

  }

  abrirModal(medico: Medico) {
    this.modalService.abrirModal('medicos', medico._id, medico.img)
  }

  buscar(termino: string ) {
    if(termino.length === 0) {
      this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe( response => {
      this.medicos = response;
    })
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalService.nuevaImagen
    .pipe(
      delay(100)
    ).subscribe(img => this.cargarMedicos())
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

}
