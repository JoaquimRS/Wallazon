import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(
    private router: Router,
    private _userService : UserService
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let user
    let userProfile = route.parent?.paramMap.get("userProfile")
    this._userService.currentUser.subscribe(currentUser => user = currentUser.username )
    if (user != userProfile) {        
        this.router.navigate(['/profile/'+userProfile+'/profile'])      
    }
    return user == userProfile;
  }
  
}
