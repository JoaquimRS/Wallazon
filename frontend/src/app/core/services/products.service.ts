import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable,map } from 'rxjs';

import { ApiService } from './api.service';
import { Product, Products ,ProductFilters } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _apiService : ApiService
  ) { }

  allProducts(): Observable<Product[]> {
    return this._apiService.get('/products')
  }

  skipedProducts(skip:Number): Observable<Product[]>{
    return this._apiService.get('/products/skip/'+skip)
  }

  filteredProducts(productFilters: any): Observable<Products>{
    return this._apiService.get('/products/filter',new HttpParams({fromObject: productFilters}))
  }

  searchProducts(query: string): Observable<Product[]> {
    return this._apiService.get('/products/search/'+query)
  }

  modUserLike(slug: string): Observable<any>{
    return this._apiService.get('/products/like/'+slug)
  }

  detailsProduct(slug: any): Observable<Product>{    
    return this._apiService.get('/products/'+slug)
  }
}
