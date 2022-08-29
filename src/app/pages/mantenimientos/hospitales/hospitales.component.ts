import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = []
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalService: ModalImagenService,
               private busquedaService: BusquedasService ) { }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe( response => {
      this.cargando = false;
      this.hospitales = response!;
    })

  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospitales(hospital._id!, hospital.nombre).subscribe( () => {
      Swal.fire('Actualizado', hospital.nombre, 'success')
    })
  }

  eliminarCambios(hospital: Hospital) {
    this.hospitalService.borrarHospitales(hospital._id!).subscribe( () => {
      this.cargarHospitales()
      Swal.fire('Borrado', hospital.nombre, 'success')
    })
  }

  async abrirSweetalert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if(value.trim().length > 0) {
      this.hospitalService.crearHospitales(value!).subscribe( (response: any) => {
        this.hospitales.push(response.hospital)
      })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalService.abrirModal('hospitales', hospital._id, hospital.img)
  }

  buscar(termino: string) {
    console.log(termino)
    if(termino.length === 0) {
      this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino).subscribe( response => {
      this.hospitales = response;
    })
  }

  ngOnInit(): void {
    this.cargarHospitales()
    this.imgSubs = this.modalService.nuevaImagen
                    .pipe(
                      delay(100)
                    ).subscribe(img => this.cargarHospitales())
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

}
