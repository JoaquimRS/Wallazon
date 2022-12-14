import { Component, OnInit } from '@angular/core';
import { 
  CategoriesService, 
  Category, 
  ProductsService, 
  Product 
} from '../core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = []
  products: Product[] = []
  skip: Number = 0
  scroll: boolean = false

  constructor(
    private _categoryService: CategoriesService,
    private _productService : ProductsService
  ) {}
  
  ngOnInit(): void {
    this._categoryService.allCategories()
      .subscribe((categories)=>{
        this.categories = categories
      })
    this._productService.skipedProducts(this.skip)
      .subscribe((products)=>{        
        products.length > 0 ? (this.products = products, this.skip = +this.skip + 1) : this.scroll = true
      })
  }

  onScroll() {    
    this._productService.skipedProducts(this.skip)
      .subscribe((products) =>{
        products.length > 0 && this.skip < 5 ? (this.products.push(...products), this.skip = +this.skip + 1) : this.scroll = true
      })
  }


}
