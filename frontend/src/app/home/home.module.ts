import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared';



@NgModule({
  imports: [
    HomeRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    BrowserModule,
    SharedModule

  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
