import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, userInfo } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _apiService : ApiService
  ) { }

  login(userInfo: any): Observable<User> {    
    return this._apiService.get('/auth/login',new HttpParams({fromObject: userInfo}))
  }
  register(userInfo: Object): Observable<User> {
    return this._apiService.post('/auth/',userInfo)
    
  }
}
