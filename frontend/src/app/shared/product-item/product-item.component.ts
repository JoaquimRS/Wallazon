import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core';


@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product

  // product: Product = {
  //   title: "Funda Huawei P10",
  //   category: "Accesorios",
  //   price:5,
  //   condition:"Nuevo",
  //   description:"Me compre la funda y se me rompio el telefono",
  //   images: [
  //     "funda-huawei-p10-s9849_01.png"
  //   ],
  //   location: {
  //     lat:"38.78317511958394",
  //     long:"-0.7852579314872142",
  //     city:"Fontanars dels Alforins"
  //   }
  // }
  
  
}
