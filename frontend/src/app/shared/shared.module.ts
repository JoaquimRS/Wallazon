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
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { LikeButtonComponent } from './like-button/like-button.component';
import { CommentsListComponent } from './comments-list/comments-list.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ProductItemComponent,
    ProductListComponent,
    FiltersComponent,
    PaginationComponent,
    OrderComponent,
    FollowButtonComponent,
    LikeButtonComponent,
    CommentsListComponent
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
    OrderComponent,
    FollowButtonComponent,
    LikeButtonComponent,
    CommentsListComponent
  ]
})
export class SharedModule { }
