import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
// import { NgxPaginationModule } from 'ngx-pagination';

import { CarouselComponent } from './carousel/carousel.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ProductItemComponent,
    ProductListComponent,
    FiltersComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    CarouselComponent,
    ProductItemComponent,
    ProductListComponent,
    FiltersComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
