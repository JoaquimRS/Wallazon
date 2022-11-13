import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Product, ProductsService, UserService } from 'src/app/core';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

  @Input() product!: Product  
  user!: boolean
  like: IconPrefix = "far"
  constructor(
    private _userService: UserService,
    private _productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe((user)=>{
      this.user = user
    })
    this.product.userLike ? this.like = "fas" : this.like = "far"
  }

  productLike(product: Product) {
    if (this.user) {
      this._productService.modUserLike(product.slug).subscribe()
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
