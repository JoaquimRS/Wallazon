import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared';


@NgModule({
  imports: [
    ShopRoutingModule,
    FontAwesomeModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [ShopComponent],
})
export class ShopModule { }
