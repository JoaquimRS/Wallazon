import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  imports: [
    HomeRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    BrowserModule,
    SwiperModule

  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
