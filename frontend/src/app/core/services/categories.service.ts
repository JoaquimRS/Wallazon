import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Category } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _apiService : ApiService,
  ) { }

  allCategories(): Observable<Category[]> {
    return this._apiService.get('/categories')
  }
  getCategory(slug: any): Observable<Category> {
    return this._apiService.get('/categories/'+slug)
  }
}
