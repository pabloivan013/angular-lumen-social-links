import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { AppSettings } from '../../../../app.settings';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styles: [],
})
export class ProfileCardComponent implements OnInit {
  @Input() user: User;

  loadingUpdateUser: boolean = false;
  loadingUser: boolean = false;

  successLoadUpdateUser: boolean = false;
  errorServer: boolean = false;
  validAccountName: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    public auth: AuthService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
    this.loadUser();
  }

  onReload(event) {
    this.loadUser();
  }

  getAuthUser() {
    this.auth.user$.subscribe(
      (user: User) => {
        if (user) Object.assign(this.user, user);
      },
      (error) => console.log('getAuthUser error: ', error)
    );
  }

  loadUser() {
    this.loadingUser = true;

    this.userService.getUser().subscribe(
      (user: User) => {
        Object.assign(this.user, user);
        this.validAccountName = user.accountname;
        this.loadingUser = false;
        this.successLoadUpdateUser = true;
        this.errorServer = false;
      },
      (error) => {
        console.log('getUser error: ', error);
        this.loadingUser = false;
        this.successLoadUpdateUser = false;
        if (error.status == AppSettings.VALIDATOR_CODE && error.error.sub) {
          // User not found in db, need to be created before save links
          this.errorServer = false;
          this.errorMessage = 'Update your account name before save';
          this.snackBarService.error(this.errorMessage);
        } else {
          // Server error
          this.errorServer = true;
        }
      }
    );
  }

  createUpdateUser() {
    this.successLoadUpdateUser = false;
    if (
      !this.user.accountname ||
      this.user.accountname.length < 5 ||
      this.user.accountname.length > 15
    ) {
      this.errorMessage = 'The account name should be between 5 and 15 characters';
      this.snackBarService.error(this.errorMessage);
      return;
    }

    this.loadingUpdateUser = true;

    this.userService.createUpdateUser(this.user).subscribe(
      (user: User) => {
        this.loadingUpdateUser = false;
        this.snackBarService.success('User updated');
        this.successLoadUpdateUser = true;
        this.validAccountName = user.accountname;
      },
      (error) => {
        console.log('createUpdateUser error: ', error);
        this.loadingUpdateUser = false;
        this.successLoadUpdateUser = false;
        this.errorMessage = 'Error updating user';
        if (
          error.status == AppSettings.VALIDATOR_CODE &&
          error.error.accountname
        ) {
          //Validator error
          this.errorMessage = error.error.accountname[0];
        }
        this.snackBarService.error(this.errorMessage);
      }
    );
  }

  getUrlLink() {
    return window.location.href + this.validAccountName;
  }
}
