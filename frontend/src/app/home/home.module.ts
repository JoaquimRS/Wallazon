import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  imports: [
    HomeRoutingModule,
    MatIconModule,
    FontAwesomeModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
