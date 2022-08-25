import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario?: Usuario;

  constructor( private usuariosService: UsuariosService) {
    this.usuario = usuariosService.usuario;
   }

  logout() {
    this.usuariosService.logout()
  }

}
