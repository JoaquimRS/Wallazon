import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
// import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApiService } from './api.service';
import { Category } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private apiService : ApiService,
    // private http: HttpClient
  ) { }

  allCategories(): Observable<Category[]> {
    return this.apiService.get('/categories')

  }

  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):Observable<any[]> {
  //   return this.allCategories()
  // }
}
