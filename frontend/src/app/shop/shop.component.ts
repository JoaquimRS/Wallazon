import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

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
  ppp: number = 12;
  products!: Product[]
  // paginated_products!: Product[][]
  categories: Category[] = []
  slugCategory: string | null
  // productFilters: ProductFilters = {limit: 12, offset: 0};
  // numpag!: number

  constructor(
    private _productService: ProductsService,
    private _categoryService : CategoriesService,
    private aRouter : ActivatedRoute,
    ) {
      this.slugCategory = this.aRouter.snapshot.paramMap.get('slugCategory');
     }

  ngOnInit(): void {    
    this._categoryService.allCategories()
      .subscribe((categories) => {
        this.categories = categories
    })
    this.getCategoryProducts()

  }
  getCategoryProducts() {
    if (this.slugCategory) {
      this._categoryService.getCategory(this.slugCategory)
        .subscribe((category) => {          
          this.products = category.products
      })
    } else {
    // TODO Fer la paginacio, diseñarla i aprofitar el offset del productFilters
    
    this._productService.allProducts()
      .subscribe((products)=>{
        this.products = products
      })
    // PRODUCTES FILTRATS PER BBDD
    // this._productService.filteredProducts(this.productFilters)
    //   .subscribe((products)=>{        
    //     this.products = products
    //   })

    // PRODUCTES FILTRATS PER EL CLIENT
    // this._productService.allProducts()
    //   .subscribe((products)=>{
    //       this.paginate_products(products)
    //   })
    }
  } 

  // paginate_products(products: Product[]){
  //   this.numpag = Math.ceil(products.length/this.ppp)    
  //   let prods: Product[][] = []
  //   let divprods: Product[] = []
  //   let j = 0
  //   let lng = this.ppp
  //   for (let i = 1; i <= this.numpag; i++) {
  //     lng=lng + j
  //     for (j; j < lng; j++) {
  //       if (products[j]){
  //         divprods.push(products[j]);
  //       } else {
  //         break
  //       }
  //     }
  //     prods.push(divprods)
  //     divprods = []
  //   }
  //   this.paginated_products = prods
  //   this.setPagination()
  // }
  
  // setPagination(page?: number) {
  //   if (page) {
  //     this.products = this.paginated_products[page]
  //   } else {
  //     this.products = this.paginated_products[0]
  //   }
  // }


}
