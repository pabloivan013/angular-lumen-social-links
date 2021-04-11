import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { SocialLink } from '../models/social-link.model';
import { AppSettings } from '../app.settings'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /** Auth0 endpoints **/
  getUser(): Observable<User> {
    return this.http.get<User>(`${AppSettings.API_ENDPOINT}/auth0/users`)
  }

  createUpdateUser(user: User): Observable<User> {
    return this.http.post<User>(`${AppSettings.API_ENDPOINT}/auth0/users`, user)
  }

  getUserLinks(): Observable<SocialLink[]> {
    return this.http.get<SocialLink[]>(`${AppSettings.API_ENDPOINT}/auth0/users/links`)
  }

  saveUserLinks(user: User): Observable<any> {
    return this.http.post<any>(`${AppSettings.API_ENDPOINT}/auth0/users/links`, user)
  }

  /** Public endpoints **/
  getUserLinksByName(username: string): Observable<SocialLink[]> {
    return this.http.get<SocialLink[]>(`${AppSettings.API_ENDPOINT}/users/${username}/links`)
  }

  getUserByName(username: string) {
    return this.http.get<User>(`${AppSettings.API_ENDPOINT}/users/${username}`)
  }

}
