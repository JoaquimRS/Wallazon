import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, CommentsService, Product } from '../core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  product!: Product
  comments!: Comment[]
  constructor(
    private aRouter: ActivatedRoute,
    private _commentsService: CommentsService
    ) { 
    this.aRouter.data.subscribe(({product}) => this.product = product)
    this._commentsService.getProduct(this.product.slug).subscribe(data=> this.comments = data)    
  }
  
  ngOnInit(): void { 
  }

}
