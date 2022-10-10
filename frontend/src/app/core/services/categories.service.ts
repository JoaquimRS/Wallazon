import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

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
}
