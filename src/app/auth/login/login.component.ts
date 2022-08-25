import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn?: ElementRef;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuariosService,
              private ngZone: NgZone) { }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe( response => {
      if(this.loginForm.get('remember')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      } else {
        localStorage.removeItem('email')
      }

      this.router.navigateByUrl('/')
    }, (error) => {
      Swal.fire('Error', error.error.message, 'error')
    })
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '140312723802-lam5f3cccn5cpnv09rcsk1722gru2hu1.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }
    );
  }

  handleCredentialResponse(response: any) {
    console.log('entro al handle', response)
    this.usuarioService.loginGoogle(response.credential).subscribe( response => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      })
    }, (error) => {
      Swal.fire('Error', error.error.message, 'error')
    })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

}
