import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp!: any;

  constructor (private fb: FormBuilder,
               private usuarioService: UsuariosService,
               private fileUploadService: FileUploadService) {
                this.usuario = this.usuarioService?.usuario!;
                }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe( response => {
      const {nombre, email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email

      Swal.fire('Guardado', 'Cambios guardados con exito', 'success');
    }, (error) => {
      Swal.fire('Error', error.error.message, 'error')
    })
  }

  cambiarImagen(target: any) {
    this.imagenSubir = target.files[0];

    if(!this.imagenSubir) { 
        this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir)

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
    .then( img => {
      this.usuario.img = img
      Swal.fire('Imagen actualizada', 'Imagen actualizada con exito', 'success');
    })
  }

}
