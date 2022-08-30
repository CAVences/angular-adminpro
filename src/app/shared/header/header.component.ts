import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario?: Usuario;

  constructor( private usuariosService: UsuariosService,
               private router: Router ) {
    this.usuario = usuariosService.usuario;
   }

  logout() {
    this.usuariosService.logout()
  }

  buscar( termino: string) {
    if(termino.length === 0) {
      this.router.navigateByUrl('/dashboard')
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
