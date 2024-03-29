import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario?: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario?.role!;
  }

  get correo(): string {
    return this.usuario?.email!;
  }

  get google(): boolean {
    return this.usuario?.google!;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }


  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, { headers: { 'x-token': this.token } })
      .pipe(
        map((response: any) => {
          const { email, google, nombre, role, img = '', uid } = response.usuario;
          this.usuario = new Usuario(nombre, email, '', role, google, img, uid)
          this.guardarLocalStorage(response.token, response.menu)
          return true;
        }),
        catchError(error => of(false))
      )
  }

  cearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
            .pipe(
              tap( (response: any) => {
                this.guardarLocalStorage(response.token, response.menu)
              })
            )
  }


  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(response => {
          const usuarios = response.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
          );

          return {
            total: response.total,
            usuarios
          }
        })
      )
  }


  actualizarPerfil(data: { email: string, nombre: string, role?: string }) {
    data = {
      ...data,
      role: this.usuario?.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
  }


  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }


  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((response: any) => {
          this.guardarLocalStorage(response.token, response.menu)
        })
      )
  }


  loginGoogle(token: string) {
    console.log('entro al services: ', token)
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((response: any) => {
          this.guardarLocalStorage(response.token, response.menu)
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    if(this.google) {
      google.accounts.id.revoke(this.correo, () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login')
        })
      })
    } else {
      this.router.navigateByUrl('/login')
    }
    
  }


  guardarUsuario(usuario: Usuario) {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)

  }

}