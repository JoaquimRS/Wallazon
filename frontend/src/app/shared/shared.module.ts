import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CarouselComponent } from './carousel/carousel.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ProductItemComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule
  ],
  exports: [
    CarouselComponent,
    ProductItemComponent,
    ProductListComponent
  ]
})
export class SharedModule { }
