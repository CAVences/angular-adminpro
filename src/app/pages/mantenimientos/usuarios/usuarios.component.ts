import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgsubs?: Subscription;

  constructor(private usuariosServices: UsuariosService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }


  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img)
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuariosServices.cargarUsuarios(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp
    }

    this.busquedasService.buscar('usuarios', termino).subscribe(response => {
      this.usuarios = response
    })

  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuariosServices.uid) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    } else {
      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Estas a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrarlo'
      }).then((result) => {
        if (result.value) {

          this.usuariosServices.eliminarUsuario(usuario).subscribe(() => {
            this.cargarUsuarios();
            Swal.fire('Usuario eliminado', `${usuario.nombre} fue eliminado exitosamente`, 'success')
          }, (error) => {
            Swal.fire('Error', error.error.message, 'error')
          });

        }
      })
    }
  }

  cambiarRole(usuario: Usuario) {
    this.usuariosServices.guardarUsuario(usuario).subscribe(response => {
      console.log(response)
    })
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    
    this.imgsubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( () => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
   this.imgsubs?.unsubscribe();
  }

}
