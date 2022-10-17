import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselComponent } from './carousel/carousel.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginationComponent } from './pagination/pagination.component';
import { OrderComponent } from './order/order.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ProductItemComponent,
    ProductListComponent,
    FiltersComponent,
    PaginationComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CarouselComponent,
    ProductItemComponent,
    ProductListComponent,
    FiltersComponent,
    PaginationComponent,
    OrderComponent
  ]
})
export class SharedModule { }
