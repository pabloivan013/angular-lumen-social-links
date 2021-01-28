import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-save-logged-user',
  templateUrl: './save-logged-user.component.html',
  styles: [
  ]
})
export class SaveLoggedUserComponent implements OnInit {

  constructor(
    private router: Router, 
    public auth: AuthService, 
    private userService: UserService
  ){}
  
  async ngOnInit(): Promise<void> {
    console.log("redirect...")

  //   this.auth.user$.pipe(
  //   switchMap((user: User) => { 
  //     console.log("mergemap user: ", user)
  //     if (!user)
  //       this.auth.loginWithRedirect()
  //     return this.userService.addUser(user) 
  //   } ),
  // ).subscribe(
  //   (user: User) => {
  //     console.log("after post: ", user)
  //     this.router.navigate(['/profile'])
  //   },
  //   (error) => {
  //     console.log("error: ",error)
  //     this.router.navigate(['/'])
  //   },
  //   () => console.log("finally")
  // )


    // this.auth.user$.pipe(
    //   mergeMap((user: User) => { 
    //     console.log("mergemap user: ", user)
    //     if (!user)
    //       throw 'no user'
    //     return this.userService.addUser(user) 
    //   } ),
    // ).subscribe(
    //   (user: User) => {
    //     console.log("after post: ", user)
    //     this.router.navigate(['/profile'])
    //   },
    //   (error) => {
    //     console.log("error: ",error)
    //     this.router.navigate(['/'])
    //   },
    //   () => console.log("finally")
    // )
  }

}
