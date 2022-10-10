import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable,map } from 'rxjs';

import { ApiService } from './api.service';
import { Product } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private apiService : ApiService
  ) { }

  allProducts(): Observable<Product[]> {
    return this.apiService.get('/products')
  }
}
