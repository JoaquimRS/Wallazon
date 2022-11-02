import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject } from 'rxjs';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User)
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged())

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1)
  public isAuthenticated = this.isAuthenticatedSubject.asObservable()

  constructor(
    private _jwtService : JwtService,
    private _apiService : ApiService
  ) { }

  populate() {
    if (this._jwtService.getToken()) {
      this._apiService.get('/users/')
      .subscribe(
        user => this.saveUser(user),
        err => this.deleteUser()       
      )
    } else {
      this.deleteUser()
    }
    
  }

  saveUser(user: User) {
    this._jwtService.saveToken(user.token)

    this.currentUserSubject.next(user)

    this.isAuthenticatedSubject.next(true)
  }

  deleteUser() {
    this._jwtService.destroyToken()

    this.currentUserSubject.next({} as User)

    this.isAuthenticatedSubject.next(false)
  }

}
