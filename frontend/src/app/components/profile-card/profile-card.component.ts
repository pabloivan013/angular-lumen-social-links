import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styles: [
  ]
})
export class ProfileCardComponent implements OnInit {

  @Input() user: User
  
  loadingSaveUser: boolean = false
  loadingUser: boolean = false

  successLoadUpdateUser: boolean = false

  errorMessage: string = ''
  errorServer: boolean = false
  validAccountName: string = ''

  constructor(private userService: UserService,
              public auth: AuthService,
              private snackBarService: SnackbarService
    ) { }

  ngOnInit(): void {
    this.getAuthUser()
    this.loadUser()
  }

  onReload(event) {
    this.loadUser()
  }

  loadUser() {
    this.loadingUser = true

    this.userService.getUser().subscribe(
      (user: User) => {
        console.log("getUser: ", user)
        Object.assign(this.user, user)
        this.validAccountName = user.accountname
        this.loadingUser = false
        this.successLoadUpdateUser = true
        this.errorServer = false
        console.log("this.user: ", this.user)
      },
      (error) => {
        console.log("getUser error: ", error)
        this.loadingUser = false
        this.successLoadUpdateUser = false
        if (error.status == 404) { 
          // User not found in db
          this.errorServer = false
          this.errorMessage = 'Update your account name before save'
          this.snackBarService.error(this.errorMessage)
        } else {                    
          // Server error
          this.errorServer = true
        }
        
      }
    )
  }

  getAuthUser() {
    this.auth.user$.subscribe(
      (user: User) => {
        if (user)
          Object.assign(this.user, user)
      },
      (error) => console.log("getAuthUser error: ", error)
    )
  }

  createUpdateUser() {
    if (this.user.accountname.length < 5 || this.user.accountname.length > 15) {
      this.snackBarService.error("The account name should be between 5 and 15 characters")
      return
    }
    this.loadingSaveUser = true
    
    this.userService.createUpdateUser(this.user).subscribe(
      (user: User) => {
        this.loadingSaveUser = false
        this.snackBarService.success('User updated')
        this.successLoadUpdateUser = true
        this.validAccountName = user.accountname
      },
      (error) => {
        console.log("createUpdateUser error: ", error)
        this.loadingSaveUser = false
        this.successLoadUpdateUser = false
        this.errorMessage = 'Error updating user'
        if (error.status == 409){
          this.errorMessage = error.error.message
        }
        this.snackBarService.error(this.errorMessage)
      }
    )
  }

  getUrlLink() {
    return window.location.href + this.validAccountName
  }

}
