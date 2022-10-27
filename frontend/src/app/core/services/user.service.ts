import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject } from 'rxjs';
import { User } from '../models';
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
  ) { }

  saveUser(user: User) {
    this._jwtService.saveToken(user.token)

    this.isAuthenticatedSubject.next(true)
  }

  deleteUser() {
    this._jwtService.destroyToken()

    this.isAuthenticatedSubject.next(false)
  }

}
