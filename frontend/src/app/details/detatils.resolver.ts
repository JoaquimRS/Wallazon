import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product, ProductsService, Profile, UserService } from '../core';


@Injectable({
  providedIn: 'root'
})
export class DetailsResolver implements Resolve<Product> {
  constructor (private _productService: ProductsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    let slugProduct = route.paramMap.get('slugProduct')        
    
    return this._productService.detailsProduct(slugProduct)
    
  }
}
