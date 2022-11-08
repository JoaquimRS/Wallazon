import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject } from 'rxjs';
import { Profile, User } from '../models';
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

  getUserProfile(userProfile: String | null,path: any): Observable<Profile>{    
    return this._apiService.get('/users/'+userProfile,new HttpParams({fromObject:path}))
  }

  setUserProfile(updateProfile: Profile): Observable<any>{
    let updatedProfile = this._apiService.post('/users/',updateProfile)
    updatedProfile.subscribe((data)=>{
      if (data.user) {
        this.currentUserSubject.next(data.user)       
      }
    })
    return updatedProfile
  }

  changeFollow(username: String): Observable<any>{
    return this._apiService.get('/users/follow/'+username)
  }

  updateUserImage(file: FileList):Observable<any>{
    let newFile:any = file.item(0)
    let token = this._jwtService.getToken
    const formData: FormData = new FormData()
    formData.append('file',newFile)    

    return this._apiService.postFormData('/users/img/',formData)
  }
}
