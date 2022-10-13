import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core';


@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product  
  
}
