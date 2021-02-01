import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { filter, mergeMap } from 'rxjs/operators';
import { SocialLink } from 'src/app/models/social-link.model';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  user: User = new User();
  authenticated: boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(
      (auth) => {
        this.authenticated = auth;
      },
      (error) => console.log('Error auth: ', error)
    );
  }
}
