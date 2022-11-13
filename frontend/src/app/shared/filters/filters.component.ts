import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Category, ProductFilters } from 'src/app/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Input() categories! : Category[]
  @Input() inFilters!: ProductFilters
  @Output() outFilters = new EventEmitter<ProductFilters>();
  filtersForm: FormGroup
  conditions: string[] = ["Nuevo","Semi Nuevo","Buen Estado","Aceptable"];

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      category: [''],
      condition: this.fb.array([])
    })
  }

  ngOnInit(): void {

  }

  applyFilters() {
    this.inFilters.category = this.filtersForm.get("category")?.value
    this.inFilters.condition = this.filtersForm.get("condition")?.value
    this.outFilters.emit(this.inFilters)
    
  }

  onCheckboxChange(e: any) {    
    const condition: FormArray = this.filtersForm.get('condition') as FormArray;
    if (e.target.checked) {
      condition.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      condition.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          condition.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.applyFilters()
  }

}
