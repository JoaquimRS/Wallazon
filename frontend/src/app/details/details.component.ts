import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, CommentsService, Product, ProductsService, UserService } from '../core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  product!: Product
  comments!: Comment[]
  sameUser: boolean = false

  price: number = 0
  condition: string = ""
  description: string = ""
  conditions: string[] = ["Nuevo","Semi Nuevo","Buen Estado","Aceptable"];

    constructor(
    private aRouter: ActivatedRoute,
    private _commentsService: CommentsService,
    private _userService: UserService,
    private _productService: ProductsService
    ) { 
    this.aRouter.data.subscribe(({product}) => this.product = product)
    this._commentsService.getProduct(this.product.slug).subscribe(data=> this.comments = data)    
    this._userService.currentUser.subscribe((currentUser)=>{
      this.sameUser = currentUser.username == this.product.owner.username      
    })
  }
  
  ngOnInit(): void { 
    this.price = this.product.price
    this.condition = this.product.condition
    this.description = this.product.description
    
  }
  applyChanges() {
    this.product.price = this.price
    this.product.condition = this.condition
    this.product.description = this.description
    
    this._productService.modUser(this.product).subscribe(data => console.log(data))
    
    
  }
}
