import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() numpages!: Number
  @Output() page = new EventEmitter<number>();


  changePage(page: number) {
    this.page.emit(page)
  }


  constructor() { }

  ngOnInit(): void {
  }

}
