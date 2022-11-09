import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  product!: Product
  constructor(private aRouter: ActivatedRoute) { 
    this.aRouter.data.subscribe(({product}) => this.product = product)
    console.log(this.product);
    
  }
  
  ngOnInit(): void { }

}
