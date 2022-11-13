import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _userService : UserService
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      let user = this._userService.isAuthenticated.pipe(take(1))
      user.subscribe(data=>data ? null : this.router.navigate(['/auth/login']))
      
      return this._userService.isAuthenticated.pipe(take(1))
  }
  
}
