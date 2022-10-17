import { Component} from '@angular/core';
import { ProductsService, Product } from 'src/app/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  products! : Product[]
  search = ""

  constructor(private _productService : ProductsService) { }

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
}
