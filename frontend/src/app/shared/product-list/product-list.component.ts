import { Component, Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Product } from 'src/app/core';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() products! : Product[]
  page!: number 

}
