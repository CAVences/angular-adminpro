import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {}

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {headers: { 'x-token': token }})
                    .pipe(
                      tap((response: any) => {
                        localStorage.setItem('token', response.token)
                      }),
                      map(response => true),
                      catchError( error => of(false))
                    )
  }

  cearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap((response: any) => {
                        console.log(response);
                        localStorage.setItem('token', response.token)
                      })
                    )
  }


  loginGoogle(token: string) {
    console.log('entro al services: ', token)
    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe(
                      tap((response: any) => {
                        console.log(response);
                        localStorage.setItem('token', response.token)
                      })
                    )
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('adan.vences@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login')
      })
    })
  }


}