import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//@ts-ignore
declare function customInitFunctions();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  login() {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    customInitFunctions();
  }

}
