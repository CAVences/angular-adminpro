import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

  cargarMenu(): any {
    const menu =localStorage.getItem('menu')
    this.menu = JSON.parse(menu!);
    console.log(this.menu);
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Graficas', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'Rxjs', url: 'rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //     ]
  //   }
  // ]

  constructor() { }
}
