import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]) {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
    )
  }

  private transformarHospitales(resultados: any[]) {
    return resultados
  }

  private transformarMedicos(resultados: any[]) {
    return resultados
  }

  busquedaGlobal( termino: string) {
    const url = `${base_url}/busqueda/${termino}`;
    return this.http.get(url, this.headers)
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}/busqueda/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((response: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(response.resultados);
            case 'hospitales':
              return this.transformarHospitales(response.resultados);
            case 'medicos':
            return this.transformarMedicos(response.resultados);
            default:
              return [];
          }
        })
      )
  }


}
