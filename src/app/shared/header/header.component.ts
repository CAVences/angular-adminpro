import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private usuariosService: UsuariosService) { }

  logout() {
    console.log('cerrando sesion')
    this.usuariosService.logout()
  }

}
