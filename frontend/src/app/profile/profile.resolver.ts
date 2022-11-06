import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Profile, UserService } from '../core';


@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Observable<Profile>> {
  constructor (private _userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile> {
    let userProfile = route.parent!.paramMap.get('userProfile')        
    let path = { path: route.routeConfig!.path}
    return this._userService.getUserProfile(userProfile,path)
    
  }
}
