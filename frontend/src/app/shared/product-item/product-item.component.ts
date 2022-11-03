import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductsService, User, UserService } from 'src/app/core';
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { Router } from '@angular/router';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  constructor (
    private _userService: UserService,
    private _productService: ProductsService,
    private router: Router
    ) {}
  user!: boolean
  like: IconPrefix = "far"
  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe((user)=>{
      this.user = user
    })
    this.product.userLike ? this.like = "fas" : this.like = "far"
    
  }
  @Input() product!: Product  
  
  productLike(product: Product) {
    if (this.user) {
      this._productService.modUserLike(product.slug).subscribe((res)=>console.log(res))
      if (this.product.userLike) {
        this.like = "far"
        this.product.userLike = false
        this.product.likes += -1
      } else {
        this.like = "fas"
        this.product.userLike = true
        this.product.likes += 1
      }


    } else {
      this.router.navigate(['/auth/login'])
    }

    
  }
}
