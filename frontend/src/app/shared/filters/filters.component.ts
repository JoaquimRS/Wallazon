import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core'

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Input() categories! : Category[]

  constructor() { }

  ngOnInit(): void {
  }

}
