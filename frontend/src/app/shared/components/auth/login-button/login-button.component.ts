import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styles: [],
})
export class LoginButtonComponent implements OnInit {

  savingUser: Boolean

  constructor(
    public auth: AuthService
  ){}

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup()
  }
}
