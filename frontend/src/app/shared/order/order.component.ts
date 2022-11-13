import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductFilters } from 'src/app/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() inFilters!: ProductFilters
  @Output() outFilters = new EventEmitter<ProductFilters>()
  ordersForm: FormGroup
  orders: string[][] = [["Precio","price"]]

  constructor(private fb: FormBuilder) {
    this.ordersForm = this.fb.group({
      order: this.fb.array([])
    })
  }

  ngOnInit(): void {
  }

  applyOrders() { 
    this.inFilters.order = this.ordersForm.get("order")?.value

    this.outFilters.emit(this.inFilters)
  }

  onCheckboxChange(e: any) {    
    const order: FormArray = this.ordersForm.get('order') as FormArray;
    if (e.target.checked) {
      order.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      order.controls.forEach((item: any) => {        
        if (item.value == e.target.value) {
          order.removeAt(i);
          
          return;
        }
        i++;
      });
    }
    this.applyOrders()
  }

}
