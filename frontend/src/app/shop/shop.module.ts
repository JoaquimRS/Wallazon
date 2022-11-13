import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared';


@NgModule({
  imports: [
    ShopRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  declarations: [ShopComponent],
})
export class ShopModule { }
