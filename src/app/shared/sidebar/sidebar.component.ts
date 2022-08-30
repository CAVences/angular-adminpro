import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menuItems!: any[];
  public usuario?: Usuario;

  constructor(public sidebarService: SidebarService,
              private usuariosService: UsuariosService) { 
    this.menuItems = this.sidebarService.menu;
    this.usuario = usuariosService.usuario;
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    console.log(this.sidebarService.menu)
  }

}
