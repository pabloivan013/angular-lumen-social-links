import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment as env } from '../../environments/environment';
import { SocialLink } from '../models/social-link.model';

const API_PATH= `${env.dev.serverUrl}/api`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCreationSource = new Subject<Boolean>()

  isCreated$ = this.userCreationSource.asObservable()

  userCreated(status: Boolean) {
    this.userCreationSource.next(status)
  }

  constructor(private http: HttpClient) { }

  /** Auth0 endpoints **/
  getUser(): Observable<User>  {
    return this.http.get<User>(`${API_PATH}/auth0/users/`)
  }

  createUpdateUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_PATH}/auth0/users`, user)
  }

  getUserLinks(): Observable<SocialLink[]> {
      return this.http.get<SocialLink[]>(`${API_PATH}/auth0/users/links`)
  }

  saveUserLinks(user: User): Observable<any> {
    return this.http.post<any>(`${API_PATH}/auth0/users/links`, user)
  }

  /** Public endpoints **/
  getUserLinksByName(username: string): Observable<SocialLink[]> {
    return this.http.get<SocialLink[]>(`${API_PATH}/users/${username}/links`)
  }

  getUserByName(username:string) {
    return this.http.get<User>(`${API_PATH}/users/${username}`)
  }

}
