import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService, Product, ProductFilters } from 'src/app/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchFilters : ProductFilters = {
    limit: 12,
    offset: 0
  }
  products! : Product[]
  search = ""

  constructor(
    private _productService : ProductsService,
    private router : Router
    ) { }

  async requestProduct(query: any) {
    await this.delay(1000)
      if (query.length>3) {
        this._productService.searchProducts(query)
        .subscribe((products)=>{
          this.products = products
        })
      }
  }

  delay(ms: number) {
    return new Promise(resolve =>setTimeout(resolve,ms))
  }
  
  submitSearch() {    
    this.searchFilters.search = this.search
    this.router.navigate(['/shop',btoa(JSON.stringify(this.searchFilters))]) 
  }

}
