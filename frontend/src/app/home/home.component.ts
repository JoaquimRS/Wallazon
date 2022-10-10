import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category, ProductsService, Product } from '../core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = []
  products: Product[] = []

  constructor(

    private categoryService: CategoriesService,
    private productService : ProductsService
  ) { 
    
    
  }
  
  ngOnInit(): void {
    this.categoryService.allCategories()
      .subscribe((categories)=>{
        this.categories = categories
      })
    this.productService.allProducts()
      .subscribe((products)=>{
        console.log(products);
        this.products = products
        console.log(this.products);
        
      })
  }

}
