import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {


  public imagenSubir!: File;
  public imgTemp!: any;

  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService ) { }

  cerrarModal() {
    this.modalImagenService.cerrarModal()
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, tipo, id || '')
    .then( img => {
      Swal.fire('Imagen actualizada', 'Imagen actualizada con exito', 'success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch( error => {
      Swal.fire('Error', 'Nose pudo subir la imagen', 'error')
    })
  }
  

  ngOnInit(): void {
  }

}
