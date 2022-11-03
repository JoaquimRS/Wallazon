import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { 
  CategoriesService, 
  Category, 
  ProductsService, 
  Product,
  ProductFilters 
} from '../core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products!: Product[]
  categories: Category[] = []
  slugCategory: string | null
  filtersURL : any
  productFilters: ProductFilters = {limit: 12, offset: 0};
  numpages!: Number
  page: Number = 0

  constructor(
    private _productService: ProductsService,
    private _categoryService : CategoriesService,
    private aRouter : ActivatedRoute,
    private router : Router,
    private location: Location
    ) {
      this.slugCategory = this.aRouter.snapshot.paramMap.get('slugCategory');
      this.productFilters.category = this.slugCategory ? this.slugCategory : ""
      this.filtersURL = this.aRouter.snapshot.paramMap.get('filtersURL');
      this.filtersURL ? this.productFilters = JSON.parse(atob(this.filtersURL)) : null      
     }

  ngOnInit(): void {    
    this._categoryService.allCategories()
      .subscribe((categories) => {
        this.categories = categories
    })
    this.getCategoryProducts()
  }

  changePage(page: number) {    
    this.productFilters.offset = page
    this.location.replaceState('/shop/'+btoa(JSON.stringify(this.productFilters)))
    this.getFilteredProducts()
  }

  applyFilters(filters: ProductFilters) { 
    
    this.productFilters = filters    
    
    // this.router.navigate(['/shop',btoa(JSON.stringify(this.productFilters))])
    this.location.replaceState('/shop/'+btoa(JSON.stringify(this.productFilters)))

    this.getFilteredProducts()
  }

  getCategoryProducts() {
    if (this.slugCategory) {
      this._categoryService.getCategory(this.slugCategory)
        .subscribe((category) => {          
          this.numpages = Math.ceil(category.products.length/this.productFilters.limit)          
          this.products = category.products
      })
    
    } else {    
      this.getFilteredProducts()
    }
  } 

  getFilteredProducts() {    
    this._productService.filteredProducts(this.productFilters)
    .subscribe((filteredProducts)=>{     
      console.log(filteredProducts);
       
      this.products = filteredProducts.products
      this.numpages = Math.ceil(filteredProducts.numproducts/this.productFilters.limit)
    })
  }
}
