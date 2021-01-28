import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styleUrls: ['./authentication-button.component.scss'],
  styles: [
  ]
})
export class AuthenticationButtonComponent implements OnInit {

  constructor(public auth: AuthService, public user: UserService) { }
  ngOnInit(): void {
  }

}
