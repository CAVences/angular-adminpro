import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medicos.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup = this.fb.group({
    nombre: ['Abihu', Validators.required],
    hospital: ['', Validators.required]
  })
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado ) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data).subscribe( response => {
        console.log(response)
        Swal.fire('Actualizado', `${nombre} actualizado exitosamente`, 'success' );
      })
    } else {
      this.medicoService.crearMedico(this.medicoForm.value).subscribe( (response: any) => {
        Swal.fire('Creado', `${nombre} creado exitosamente`, 'success' );
        this.router.navigateByUrl(`/dashboard/medico/${response.medico._id}`)
      })
    }

  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales?: Hospital[]) => {
      this.hospitales = hospitales!
    })
  }

  cargarMedico(id: string) {

    if(id !== 'nuevo') {
      this.medicoService.obtenerMedicoById(id)
      .pipe(delay(100))
      .subscribe((response: any) => {
        if( !response ) {
          this.router.navigateByUrl('/dashboard/medicos')
        }
        const { nombre, hospital: { _id }} = response!;
        this.medicoSeleccionado = response!;
        this.medicoForm.setValue({nombre, hospital: _id});
      })
    }

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => this.cargarMedico(id))

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe( id => {
      this.hospitalSeleccionado = this.hospitales.find( h => h._id === id)!;
    })
  }

}
